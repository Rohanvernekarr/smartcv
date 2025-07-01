const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';


export async function analyzeResume({ resume, jobDescription }: { resume: string; jobDescription: string }) {
  const prompt = `Analyze this resume against the following job description. Score the match, list missing keywords/skills, and suggest improvements.\n\nResume:\n${resume}\n\nJob Description:\n${jobDescription}`;
  return await geminiRequest(prompt);
}

export async function generateResume({ userData }: { userData: any }) {
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
    } catch (e) {
      // If response is not JSON, fallback to text
      try {
        const errorText = await res.text();
        errorMsg += `: ${errorText}`;
      } catch {}
    }
    throw new Error(errorMsg);
  }
  return res.json();
} 