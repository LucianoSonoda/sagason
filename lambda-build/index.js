import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `Actúa como un sistema de orquestación de diseño industrial especializado en síntesis visual para grabado láser y stickers. Tu objetivo es procesar un lugar y un detalle específico para generar un prompt de imagen técnico para crear un icono 2D único.

PROCESO INTERNO (Simulación de 3 agentes):
1. AGENTE HISTORIADOR: Identifica un elemento visual REAL y VERIFICABLE del lugar solicitado (no el logo oficial).
2. AGENTE DISEÑADOR: Simplifica el elemento a formas geométricas básicas. Estilo stencil.
3. AGENTE AUDITOR: Valida la veracidad.

VERACIDAD ESTRICTA:
- NO INVENTES RESULTADOS.
- Si el detalle específico no existe o no es reconocido en el contexto del lugar indicado, NO generes diseños ficticios.
- En caso de hito inexistente o falta de información veraz, reporta el fallo en 'justificacion_tecnica' y devuelve un 'visual_prompt' vacío o con "ERROR: DATA NOT FOUND".
- Si el input es genérico, busca 3 hitos reales de los lugares más comunes.

REGLAS DE DISEÑO:
- Formato: Bidimensional (2D) estrictamente.
- Estilo: Minimalismo extremo, Bold lines, Vector-like.
- Color: Solo Blanco y Negro sólido.
- Restricción: No usar texto, no usar degradados, no usar logos comerciales.`;

export const handler = async (event) => {
    // Manejo de CORS
    if (event.requestContext && event.requestContext.http && event.requestContext.http.method === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
        };
    }

    try {
        const body = JSON.parse(event.body);
        const action = body.action;
        
        // Obtenemos la llave directamente del entorno de AWS Lambda
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        if (action === "generate_concepts") {
            const { place, detail } = body;
            const finalPlace = place?.trim() || "Lugares más comunes y comentados por visitantes (destinos turísticos globales)";
            const finalDetail = detail?.trim() || "Hitos arquitectónicos icónicos";

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Lugar: ${finalPlace}. Detalle específico: ${finalDetail}. Genera 3 opciones distintas de diseño basadas estrictamente en la realidad física y documental de estos elementos. Si no tienes datos verídicos de la combinación lugar/detalle, reporta el error.`,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                lugar: { type: Type.STRING },
                                elemento_identificado: { type: Type.STRING },
                                justificacion_tecnica: { type: Type.STRING },
                                analisis_detalle: { type: Type.STRING, description: "Justificación de por qué se eligió este hito, mencionando comentarios típicos de visitantes o rasgos únicos." },
                                visual_prompt: { type: Type.STRING },
                            },
                            required: ["lugar", "elemento_identificado", "justificacion_tecnica", "analisis_detalle", "visual_prompt"],
                        },
                    },
                },
            });

            const text = response.text;
            if (!text) throw new Error("No response from AI");
            const resultData = JSON.parse(text);

            return {
                statusCode: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ success: true, data: resultData }),
            };

        } else if (action === "generate_image") {
            const { prompt } = body;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: prompt }],
                },
                config: {
                    imageConfig: {
                        aspectRatio: "1:1",
                    },
                },
            });

            let base64Data = null;
            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    base64Data = `data:image/png;base64,${part.inlineData.data}`;
                    break;
                }
            }

            if (!base64Data) {
                throw new Error("Failed to generate image data");
            }

            return {
                statusCode: 200,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ success: true, image: base64Data }),
            };
        } else {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Invalid action" }),
            };
        }

    } catch (error) {
        console.error("Lambda Error:", error);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: error.message || "Internal Server Error" }),
        };
    }
};
