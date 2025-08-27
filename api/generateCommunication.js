import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { context, tone } = req.body;

    // --- The Magic Prompt for Communication ---
    // This prompt turns the AI into a seasoned freelance communication expert.
    const prompt = `
      You are an expert communication advisor for freelancers. Your goal is to draft clear, professional, and effective client communications.
      Based on the situation described below, write a message or email that a freelancer can send to their client.
      The message should maintain a positive client relationship while clearly addressing the freelancer's needs.

      **Situation:** ${context}
      **Desired Tone:** ${tone}

      Generate the client-ready message now.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using a slightly more nuanced model for communication
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8, // Allow for more creative and natural-sounding language
    });

    res.status(200).json({ communication: response.choices[0].message.content });

  } catch (error) {
    console.error("Error generating communication:", error);
    res.status(500).json({ error: 'Failed to generate communication.' });
  }
}