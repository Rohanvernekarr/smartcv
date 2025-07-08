const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';


export async function analyzeResume({ resume, jobDescription }: { resume: string; jobDescription: string }) {
  const prompt = `Analyze the following resume against the provided job description. Return your analysis as a JSON object with the following structure: {\n  \"overallScore\": number (0-100),\n  \"strengths\": string[],\n  \"weaknesses\": string[],\n  \"suggestions\": string[],\n  \"keywordMatch\": number (0-100),\n  \"sections\": object (optional),\n  \"rawFeedback\": string (optional)\n}\n\nResume:\n${resume}\n\nJob Description:\n${jobDescription}`;
  return await geminiRequest(prompt);
}

export async function generateResume({ userData }: { userData: unknown }) {
  const prompt = `Generate a professional resume in JSON format using the following user data:\n${JSON.stringify(userData)}`;
  return await geminiRequest(prompt);
}

async function geminiRequest(prompt: string) {
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  if (!res.ok) {
    let errorMsg = 'Gemini API error';
    try {
      const errorBody = await res.json();
      errorMsg += `: ${JSON.stringify(errorBody)}`;
    } catch {
      // If response is not JSON, fallback to text
      try {
        const errorText = await res.text();
        errorMsg += `: ${errorText}`;
      } catch {}
    }
    throw new Error(errorMsg);
  }
  const data = await res.json();
  // Log the raw Gemini response for debugging
  if (typeof window !== 'undefined') {
    console.log('Gemini API raw response:', data);
  }
  // Try to extract the text response
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || data;
} 