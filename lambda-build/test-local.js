import { handler } from "./index.js";

async function test() {
  const event = {
    body: JSON.stringify({
      action: "generate_concepts",
      place: "brasil",
      detail: "casa"
    })
  };

  try {
    const result = await handler(event);
    console.log(result);
  } catch (e) {
    console.error("Local crash:", e);
  }
}

test();
