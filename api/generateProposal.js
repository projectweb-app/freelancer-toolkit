import OpenAI from 'openai';

// Initialize the OpenAI client with your secret key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// This is our main serverless function
export default async function handler(req, res) {
  // We only want to allow POST requests to this endpoint
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get the user's input from the request body
    const { clientName, projectName, projectDescription, price } = req.body;

    // --- The Magic Prompt ---
    // This is where we instruct the AI. Good prompts are the key to good results.
    const prompt = `
      You are an expert freelance business consultant.
      Create a professional, persuasive, and friendly project proposal based on the following details.
      The proposal should be concise, well-structured with clear headings (like "Project Overview", "Scope of Work", "Investment", "Next Steps"), and written in a confident tone.
      
      **Client Name:** ${clientName}
      **Project Name:** ${projectName}
      **Project Description:** ${projectDescription}
      **Price:** ${price}

      Generate the proposal text now.
    `;

    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // A fast and capable model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // A bit of creativity
    });

    // Send the AI's generated text back to our frontend app
    res.status(200).json({ proposal: response.choices[0].message.content });

  } catch (error) {
    // If something goes wrong, send back an error message
    console.error("Error generating proposal:", error);
    res.status(500).json({ error: 'Failed to generate proposal.' });
  }
}