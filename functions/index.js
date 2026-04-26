const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

/**
 * MOCK SERVERLESS HANDSHAKE for Audkenni/Dokobit
 * 
 * In production, this function would:
 * 1. Receive phone number from frontend.
 * 2. Send request to Audkenni API to trigger push notification to user's phone.
 * 3. Wait for user to accept on their phone.
 * 4. Receive the user's Kennitala from Audkenni.
 * 
 * For this demo, it immediately returns a mock Kennitala after a simulated delay.
 */
exports.authenticateWithDokobit = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
      }

      // Simulate the wait time for the user to accept the prompt on their phone (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // MOCK RESPONSE from Audkenni
      // In production, this comes from the Audkenni API callback
      const mockKennitala = "1234567890"; 
      const mockName = "Jón Jónsson";

      // 1. Hash the Kennitala (Data Encryption / Sovereignty Requirement)
      const hashedKennitala = crypto.createHash('sha256').update(mockKennitala).digest('hex');

      // 2. Cross-reference against the Firebase 'members' collection
      const membersRef = db.collection('members');
      const snapshot = await membersRef.where('hashedKennitala', '==', hashedKennitala).get();

      let isVerifiedMember = false;
      let memberData = null;

      if (!snapshot.empty) {
        // User is a verified member in the registry
        isVerifiedMember = true;
        memberData = snapshot.docs[0].data();
      } else {
        // Registration Fallback: Create a pending member profile
        await membersRef.doc(hashedKennitala).set({
          hashedKennitala: hashedKennitala,
          name: mockName,
          status: 'pending_verification',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      // 3. Create a Custom Firebase Auth Token
      // We use the hashed kennitala as the UID to map the identity securely
      const customToken = await admin.auth().createCustomToken(hashedKennitala, {
        isVerifiedMember: isVerifiedMember,
        canAccessHaukarTalk: isVerifiedMember 
      });

      // 4. Return the token and user details to the frontend
      res.status(200).json({
        success: true,
        customToken: customToken,
        user: {
          name: mockName,
          isVerifiedMember: isVerifiedMember
        }
      });

    } catch (error) {
      console.error("Dokobit Auth Error:", error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });
});

/**
 * TICKETING ENGINE: Generate Ticket & Google Wallet Pass
 * 
 * Idempotency: Checks if ticket already exists before generating to prevent duplicates.
 */
exports.generateTicket = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { fanId, matchId, membershipTier } = req.body;
      
      // Idempotency Check
      const ticketsRef = db.collection('tickets');
      const existingTicket = await ticketsRef.where('fan_id', '==', fanId).where('match_id', '==', matchId).get();
      
      if (!existingTicket.empty) {
        return res.status(200).json({ 
          success: true, 
          message: 'Ticket already exists',
          passUrl: existingTicket.docs[0].data().wallet_pass_url 
        });
      }

      // Determine Wallet Class based on Tiered Membership
      const walletClass = membershipTier === 'Gold' ? 'Haukar_Gold' : 'Haukar_Silver';

      const ticketData = {
        fan_id: fanId,
        match_id: matchId,
        scanned_in: false,
        seat_info: membershipTier === 'Gold' ? { section: 'VIP', row: 'A', seat: '1' } : { section: 'General', row: 'Open', seat: 'Open' },
        wallet_class: walletClass,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        // TTL for self-cleaning DB (Archives 48 hours after creation for this demo)
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000) 
      };

      const newTicket = await ticketsRef.add(ticketData);

      // MOCK: Google Wallet API Integration
      // In production, this generates a signed JWT using the Google Wallet REST API
      const mockWalletPassUrl = `https://pay.google.com/gp/v/save/${newTicket.id}_${walletClass}`;
      
      await newTicket.update({ wallet_pass_url: mockWalletPassUrl, pass_id: newTicket.id });

      res.status(200).json({ success: true, passUrl: mockWalletPassUrl });
    } catch (error) {
      console.error("Ticket Generation Error:", error);
      res.status(500).json({ error: 'Failed to generate ticket' });
    }
  });
});

/**
 * AUTOMATION: Flight-Style Wallet Updates
 * 
 * Watches the 'matches' collection. If the match status changes (e.g. Pre-Game to Half-Time),
 * it triggers a batch update to the Google Wallet REST API.
 */
exports.onMatchStatusChange = functions.firestore
  .document('matches/{matchId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Only run if the live_status changed
    if (newValue.live_status === previousValue.live_status) return null;

    console.log(`Match ${context.params.matchId} status changed to: ${newValue.live_status}. Updating Wallet passes...`);

    // 1. Fetch all tickets for this match
    const ticketsRef = db.collection('tickets');
    const matchTickets = await ticketsRef.where('match_id', '==', context.params.matchId).get();

    // 2. MOCK: Google Wallet REST API Patch
    // In production, loop through tickets and send PATCH request to Wallet API to update the text.
    console.log(`Mocking Google Wallet PATCH request for ${matchTickets.size} digital passes...`);
    
    return null;
  });

/**
 * THE DATA INGESTION BRIDGE (Automating Match Data)
 * 
 * Scheduled Node.js worker that actively polls the Hbstatz API for updates.
 * Normalizes the scraped data and pushes it directly into the Firestore 'matches' collection.
 */
exports.pollHbstatz = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
  console.log("Ingestion Worker: Polling Hbstatz API...");

  try {
    // 1. MOCK: Fetching data from Hbstatz API
    // In production, this uses axios/cheerio to hit the live endpoints
    const mockHbstatzData = [
      { id: 'hbstatz_2026_01', kickoff_time: '19:30', opponent: 'Grótta', live_status: 'Hálfleikur', score: '1-0' }
    ];

    const matchesRef = db.collection('matches');

    // 2. Normalize and Ingest
    for (const match of mockHbstatzData) {
      // Check if there is an active Staff Override before overwriting
      const existingDoc = await matchesRef.doc(match.id).get();
      if (existingDoc.exists && existingDoc.data().staff_override_active) {
        console.log(`Skipping update for ${match.id} due to active Staff Override.`);
        continue;
      }

      await matchesRef.doc(match.id).set({
        ...match,
        last_synced: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }

    console.log("Ingestion Worker: Sync complete.");
  } catch (error) {
    console.error("Ingestion Error:", error);
  }
  return null;
});

/**
 * CMS OVERRIDE LAYER (Staff Manual Control)
 * 
 * Allows staff to override API data (e.g. for weather delays, score corrections).
 * Activates the 'staff_override_active' flag to prevent the Ingestion Worker from reverting changes.
 */
exports.updateMatchOverride = functions.https.onCall(async (data, context) => {
  // In production, verify context.auth.token has admin privileges
  
  const { matchId, manualData } = data;
  
  if (!matchId || !manualData) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing parameters');
  }

  try {
    const matchRef = db.collection('matches').doc(matchId);
    
    await matchRef.update({
      ...manualData,
      staff_override_active: true,
      overridden_by: context.auth ? context.auth.uid : 'staff_member',
      override_timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: 'Override applied successfully.' };
  } catch (error) {
    console.error("Override Error:", error);
    throw new functions.https.HttpsError('internal', 'Failed to apply override');
  }
});
