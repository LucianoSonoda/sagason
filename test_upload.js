import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function testUpload() {
    const filePath = 'C:\\Users\\brlus\\.gemini\\antigravity\\brain\\4769a4e3-dfdd-47aa-ba4c-69c9d37ff872\\media__1772840210325.jpg';

    const form = new FormData();
    form.append('name', 'Test Request Normal Endpoint');
    form.append('attachment', fs.createReadStream(filePath));
    // Add _ajax parameter to simulate the non-/ajax/ path but requesting JSON response?

    try {
        const res = await fetch('https://formsubmit.co/ventas@sagason.cl', {
            method: 'POST',
            body: form,
            headers: {
                ...form.getHeaders(),
                'Origin': 'https://sagason.cl',
                'Referer': 'https://sagason.cl/',
                'Accept': 'application/json' // Request JSON response instead of redirect
            }
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Response:', text);
    } catch (err) {
        console.error('Error:', err);
    }
}

testUpload();
