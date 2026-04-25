// Utilizamos la URL de la nueva AWS Lambda que contiene la lógica de Gemini
const HERALDRY_API_URL = import.meta.env.VITE_HERALDRY_API_URL || '';

export async function generateHeraldryConcepts(place, detail) {
  if (!HERALDRY_API_URL) {
      throw new Error("Missing VITE_HERALDRY_API_URL en tu entorno local (.env) o de producción.");
  }

  const response = await fetch(HERALDRY_API_URL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          action: "generate_concepts",
          place: place,
          detail: detail
      })
  });

  const raw = await response.text();
  if (!response.ok) {
      throw new Error(`Error en Lambda Concepts: ${response.status} ${raw}`);
  }

  const data = JSON.parse(raw);
  if (!data.success) {
      throw new Error(data.error || "Fallo en parseo de AI");
  }

  return data.data; // Regresa el JSON parsed
}

export async function generateStickerImage(prompt) {
  if (!HERALDRY_API_URL) {
      throw new Error("Missing VITE_HERALDRY_API_URL");
  }

  const response = await fetch(HERALDRY_API_URL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          action: "generate_image",
          prompt: prompt
      })
  });

  const raw = await response.text();
  if (!response.ok) {
      throw new Error(`Error en Lambda Image: ${response.status} ${raw}`);
  }

  const data = JSON.parse(raw);
  if (!data.success) {
      throw new Error(data.error || "Fallo en generación de imagen de AI");
  }

  return data.image; // Regresa el string base64
}
