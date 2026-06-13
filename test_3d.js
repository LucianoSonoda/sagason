import puppeteer from 'puppeteer';
import { exec } from 'child_process';

const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
    console.log('Starting vite server...');
    const serverProcess = exec('npx vite --port 5173');
    
    serverProcess.stdout.on('data', data => console.log('Vite:', data.toString()));
    serverProcess.stderr.on('data', data => console.error('Vite Error:', data.toString()));

    // Wait for server to start
    await delay(3000);

    console.log('Launching puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Capture console logs
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    try {
        console.log('Navigating to /insignia...');
        await page.goto('http://localhost:5173/insignia', { waitUntil: 'networkidle2' });
        
        console.log('Waiting 5 seconds for 3D to render...');
        await delay(5000);

        const screenshotPath = 'C:\\Users\\brlus\\.gemini\\antigravity\\brain\\d9ad9471-2617-4d9f-9f1b-c94e49d7a2c0\\media__3d_test.png';
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log('Screenshot saved to ' + screenshotPath);
    } catch (e) {
        console.error('Test failed:', e);
    } finally {
        await browser.close();
        serverProcess.kill();
        process.exit(0);
    }
}

run();
