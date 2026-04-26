export const config = {
  runtime: 'edge', // Vercel Edge Runtime for 1-second scanning
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { passId } = await req.json();

    if (!passId) {
      return new Response(JSON.stringify({ error: 'Missing Pass ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // MOCK: Firestore Offline Persistence / Edge DB Check
    // In production, this verifies the token cryptographically or checks Firestore Edge Cache.
    
    // Simulate Edge latency (very fast: ~50ms)
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Assume standard "1234567890-HAUK" pass from the demo is valid
    const isValid = passId.includes("HAUK");
    
    // If Gold Member, return the Lounge Access Code
    const isGoldMember = passId.includes("Gold");
    const loungeCode = isGoldMember ? "HAUK-GOLD-99" : null;

    if (isValid) {
      return new Response(JSON.stringify({
        success: true,
        scanned_in: true,
        message: 'Aðgangur leyfður',
        lounge_code: loungeCode
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        scanned_in: false,
        message: 'Ógildur miði eða þegar skannaður'
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Edge Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
