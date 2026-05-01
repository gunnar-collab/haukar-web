import { GoogleGenAI } from '@google/genai';
import sharp from 'sharp';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function runExperiment() {
    console.log("=== STARTING MAD SCIENCE OUTPAINTING EXPERIMENT ===");
    
    const inputPath = 'public/images/news/adalfundur-knattspyrnufelagsins-hauka-4.jpg'; 
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate 16:9 target dimensions
    const originalRatio = metadata.width / metadata.height;
    const targetRatio = 16 / 9;
    
    let targetWidth = metadata.width;
    let targetHeight = metadata.height;
    
    let padLeft = 0, padRight = 0, padTop = 0, padBottom = 0;
    
    if (originalRatio < targetRatio) {
        // Needs padding on the sides
        targetWidth = Math.round(metadata.height * targetRatio);
        padLeft = Math.floor((targetWidth - metadata.width) / 2);
        padRight = Math.ceil((targetWidth - metadata.width) / 2);
    } else {
        // Needs padding on top/bottom
        targetHeight = Math.round(metadata.width / targetRatio);
        padTop = Math.floor((targetHeight - metadata.height) / 2);
        padBottom = Math.ceil((targetHeight - metadata.height) / 2);
    }
    
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    console.log(`Target 16:9 size: ${targetWidth}x${targetHeight}`);
    
    // 1. Create padded image (black background)
    const paddedBuffer = await sharp(inputPath)
        .extend({
            top: padTop, bottom: padBottom,
            left: padLeft, right: padRight,
            background: { r: 0, g: 0, b: 0, alpha: 1 }
        })
        .jpeg()
        .toBuffer();
    
    fs.writeFileSync('scratch/padded.jpg', paddedBuffer);
    console.log('1. Saved padded.jpg to scratch folder.');

    // 2. Create Mask (White = paint here, Black = keep original)
    const blackBox = await sharp({
        create: {
            width: metadata.width,
            height: metadata.height,
            channels: 3,
            background: { r: 0, g: 0, b: 0 }
        }
    }).png().toBuffer();
    
    const maskBuffer = await sharp({
        create: {
            width: targetWidth,
            height: targetHeight,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
        }
    })
    .composite([{ input: blackBox, gravity: 'center' }])
    .png()
    .toBuffer();
        
    fs.writeFileSync('scratch/mask.png', maskBuffer);
    console.log('2. Saved mask.png to scratch folder.');
    
    // 3. Try to call the API
    try {
        console.log('3. Sending to Google GenAI editImage API...');
        
        const { RawReferenceImage, MaskReferenceImage } = await import('@google/genai');

        const rawRef = new RawReferenceImage();
        rawRef.referenceId = 1;
        rawRef.referenceImage = { imageBytes: paddedBuffer.toString('base64') };

        const maskRef = new MaskReferenceImage();
        maskRef.referenceId = 2;
        maskRef.referenceImage = { imageBytes: maskBuffer.toString('base64') };
        maskRef.config = { maskMode: 'MASK_MODE_USER_PROVIDED' };

        // This is highly experimental since the Node SDK editImage method is undocumented for AI Studio keys.
        // We will pass the padded image as the reference and specify editMode in config.
        const response = await ai.models.editImage({
            model: 'imagen-3.0-capability-001',
            prompt: 'Cinematic stadium lighting, dramatic lens flare, extending the gym background.',
            referenceImages: [rawRef, maskRef],
            config: {
                editMode: 'OUTPAINT'
            }
        });
        
        const base64Image = response.generatedImages[0].image.imageBytes;
        const finalBuffer = Buffer.from(base64Image, 'base64');
        fs.writeFileSync('scratch/final_outpainted.jpg', finalBuffer);
        console.log('4. SUCCESS! Saved final_outpainted.jpg to scratch folder!');
        
    } catch(e) {
        console.error('\n[API Error]', e.message);
        console.error(e.stack);
        console.log('\nAs expected, the free AI Studio key might not have access to the experimental Image Editing endpoints without a Vertex AI project.');
        console.log('However, the padded.jpg and mask.png were successfully generated in the scratch folder!');
    }
}

runExperiment();
