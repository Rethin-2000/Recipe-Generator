import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Your parse function here ---
function parseRecipe(recipeText) {
    const lines = recipeText.split('\n');

    let title = '';
    let ingredients = [];
    let steps = [];

    let section = '';

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('## ')) {
            title = trimmed.replace('## ', '');
            continue;
        }

        if (trimmed.toLowerCase().includes('ingredients:')) {
            section = 'ingredients';
            continue;
        }

        if (trimmed.toLowerCase().includes('preparation steps')) {
            section = 'steps';
            continue;
        }

        if (section === 'ingredients' && trimmed.startsWith('*')) {
            ingredients.push(trimmed.replace('*', '').trim());
        }

        if (section === 'steps' && /^\d+\./.test(trimmed)) {
            steps.push(trimmed);
        }
    }

    return { title, ingredients, steps };
}

// --- Your route ---
router.post('/generate', async (req, res) => {
    const { ingredients } = req.body;

    const prompt = `
You are a professional chef. Create a detailed, step-by-step recipe using the following ingredients: ${ingredients.join(', ')}.

Format your response in this exact structure:

## Recipe Title

### Ingredients:
- List each ingredient clearly on a new line using bullet points.

### Preparation Steps:
1. Write each step in a numbered format.
2. Be clear, concise, and descriptive.
3. Include cooking techniques, temperatures, and estimated times where appropriate.
4. Make sure the recipe is practical and can be made at home.

Avoid adding extra comments or explanations outside the recipe. Respond in plain markdown only.
`;


    try {
        const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const parsed = parseRecipe(text); // Use the function

        res.json(parsed); // Send structured data
    } catch (error) {
        console.error('Gemini Error:', error);
        res.status(500).json({ error: 'Failed to generate recipe' });
    }
});

export default router;
