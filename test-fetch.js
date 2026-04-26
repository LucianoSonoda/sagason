const HERALDRY_API_URL = 'https://r3hp6tyrrjorq7rkfgozazbco40ksdvg.lambda-url.sa-east-1.on.aws/';

async function test() {
  const start = Date.now();
  try {
    const response = await fetch(HERALDRY_API_URL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          action: "generate_concepts",
          place: "brasil",
          detail: "casa"
      })
    });
    const duration = Date.now() - start;
    console.log(`Time: ${duration}ms`);
    console.log("Status:", response.status);
    console.log("Headers:", Array.from(response.headers.entries()));
    const text = await response.text();
    console.log("Body:", text);
  } catch (e) {
    const duration = Date.now() - start;
    console.error(`Fetch error after ${duration}ms:`, e);
  }
}

test();
