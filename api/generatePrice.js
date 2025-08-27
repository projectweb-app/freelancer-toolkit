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
    const { projectType, experienceLevel, projectLength } = req.body;

    // --- The Magic Prompt for Pricing ---
    // This prompt is engineered to make the AI act like a pricing expert.
    const prompt = `
      You are an expert freelance rate consultant who provides data-driven, fair market pricing advice.
      Based on the following project details, provide a recommended price range and a single, confident project price.
      Explain your reasoning in a brief, encouraging paragraph.

      **Project Type:** ${projectType} (e.g., Logo Design, Blog Post, Full Website, etc.)
      **Freelancer's Experience Level:** ${experienceLevel} (e.g., Beginner, Intermediate, Expert)
      **Estimated Project Length / Complexity:** ${projectLength} (e.g., Small, Medium, Large, one-week, one-month)

      Provide the output in the following format:
      **Recommended Range:** $XXXX - $YYYY
      **Confident Price:** $ZZZZ
      **Reasoning:** [Your brief explanation here]
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5, // We want more deterministic, less creative pricing.
    });

    res.status(200).json({ pricing: response.choices[0].message.content });

  } catch (error) {
    console.error("Error generating price:", error);
    res.status(500).json({ error: 'Failed to generate price suggestion.' });
  }
}