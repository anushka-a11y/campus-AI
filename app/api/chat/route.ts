import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import axios from "axios";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
    const today = new Date().toLocaleDateString(
  "en-IN",
  {
    weekday: "long",
  }
);
  try {
    const body = await req.json();

    // STEP 1:
    // Ask Gemini which MCP servers to use

    const routerPrompt = `
You are a campus MCP router.

Available services:
- library
- events
- cafeteria
- academics

Return ONLY valid JSON.

Examples:

Question: What books are available?
{"tools":["library"]}

Question: What events are happening?
{"tools":["events"]}

Question: What's on the menu today?
{"tools":["cafeteria"]}

Question: What is the attendance requirement?
{"tools":["academics"]}

Question: Tell me today's menu and upcoming events
{"tools":["cafeteria","events"]}

Question:
${body.message}
`;

    const routerResult =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: routerPrompt,
      });

    const routerText =
      routerResult.text?.trim() || "{}";

    // Remove markdown if Gemini adds it

    const cleanedText = routerText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleanedText);

    const tools =
      parsed.tools || [];

    let context = "";

    // STEP 2:
    // Fetch MCP data

    if (tools.includes("library")) {
      const response =
        await axios.get(
          "http://localhost:3001/books"
        );

      context += `
LIBRARY DATA:
${JSON.stringify(
  response.data,
  null,
  2
)}
`;
    }

    if (tools.includes("events")) {
      const response =
        await axios.get(
          "http://localhost:3002/events"
        );

      context += `
EVENTS DATA:
${JSON.stringify(
  response.data,
  null,
  2
)}
`;
    }

    if (tools.includes("cafeteria")) {
      const response =
        await axios.get(
          "http://localhost:3003/menu"
        );

      context += `
CAFETERIA DATA:
${JSON.stringify(
  response.data,
  null,
  2
)}
`;
    }

    if (tools.includes("academics")) {
      const response =
        await axios.get(
          "http://localhost:3004/academics"
        );

      context += `
ACADEMICS DATA:
${JSON.stringify(
  response.data,
  null,
  2
)}
`;
    }

    // STEP 3:
    // Ask Gemini to answer using MCP data

   const answerPrompt = `
You are the Unified Campus Intelligence Assistant.

Current Day:
${today}

Campus Data:
${context}

User Question:
${body.message}

IMPORTANT FORMATTING RULES:

- Do NOT use markdown.
- Do NOT use ** or * characters.
- Do NOT use numbered lists.
- Use plain text only.
- Use emojis for section headers.
- Use bullet points using the • character.
- Put a blank line between sections.

Example format:

📚 AVAILABLE BOOKS

• Introduction to Algorithms
• Computer Networks

🍽 TODAY'S MENU

• Veg Biryani

📖 ACADEMIC INFORMATION

• Attendance: 75%
• Credits: 22

📍 SOURCES

• Library MCP
• Cafeteria MCP

Follow this exact style.
`;

    const finalResult =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: answerPrompt,
      });

    return NextResponse.json({
      response:
        finalResult.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      response:
        "Sorry, an error occurred.",
    });
  }
}