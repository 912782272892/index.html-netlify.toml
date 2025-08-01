export async function handler(event) {
  const body = JSON.parse(event.body || "{}");
  const prompt = body.prompt;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAhI5XYoPvd2FCjn2ag-rPDxBuA_4j5haA", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Generá un guion completo para un video de YouTube sobre: " + prompt }] }]
    })
  });

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar contenido";

  return {
    statusCode: 200,
    body: JSON.stringify({ text: result })
  };
}
