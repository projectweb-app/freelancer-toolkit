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
    const { documentType, clientName, yourName, projectName, projectDescription, price, terms } = req.body;

    // --- The Magic Prompt for Legal & Financial Docs ---
    // This prompt is highly structured to produce a reliable document.
    const prompt = `
      You are an AI assistant specializing in creating clear, professional business documents for freelancers.
      Generate a ${documentType} based on the following details.
      The document should be well-structured, easy to read, and contain all the necessary information.
      For contracts, include standard clauses like Scope of Work, Payment Terms, Timeline, and Confidentiality.
      For invoices, include standard fields like Invoice Number (use a placeholder like #001), Date, Bill To, Itemized List, and Total Due.

      **Document Type to Generate:** ${documentType}
      **Client's Name:** ${clientName}
      **Freelancer's Name (Your Name):** ${yourName}
      **Project Name:** ${projectName}
      **Project Description / Scope of Work:** ${projectDescription}
      **Total Price:** ${price}
      **Additional Terms / Notes:** ${terms}

      Generate the full text for the ${documentType}.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // A reliable model for structured content
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3, // We want low creativity for predictable, professional documents.
    });

    res.status(200).json({ document: response.choices[0].message.content });

  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).json({ error: 'Failed to generate document.' });
  }
}