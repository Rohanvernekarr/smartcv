const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
  if (!res.ok) throw new Error('Gemini API error');
  return res.json();
} 