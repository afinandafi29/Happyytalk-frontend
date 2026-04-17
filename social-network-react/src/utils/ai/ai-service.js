
import { githubRotator, openaiRotator } from './key-rotator';

export async function callAI(prompt, systemInstruction = "You are Happytalk Ai, a helpful assistant.") {
  const githubKey = githubRotator.getCurrentKey();
  const openaiKey = openaiRotator.getCurrentKey();

  if (githubKey) {
    return callGitHubAI(prompt, systemInstruction, githubKey);
  } else if (openaiKey) {
    return callOpenAI(prompt, systemInstruction, openaiKey);
  } else {
    throw new Error("No AI API keys configured. Please add VITE_GITHUB_AI_TOKEN or VITE_OPENAI_API_KEY to your .env file.");
  }
}

async function callGitHubAI(prompt, systemInstruction, apiKey) {
  try {
    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        githubRotator.rotate();
        return callAI(prompt, systemInstruction); // Retry
      }
      throw new Error(`GitHub AI Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("GitHub AI Error:", error);
    throw error;
  }
}

async function callOpenAI(prompt, systemInstruction, apiKey) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        model: "gpt-4o-mini", // Use mini for cost-efficiency or if standard gpt-4 is not available
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
        throw new Error(`OpenAI Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw error;
  }
}
