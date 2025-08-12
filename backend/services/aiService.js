// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// const generateContent = async (prompt) => {
//   if (!GEMINI_API_KEY) {
//     console.error('API Key missing. Current value:', GEMINI_API_KEY);
//     throw new Error('Gemini API key not found. Please add GEMINI_API_KEY to your .env file');
//   }

//   try {
//     console.log('Making request to Gemini API with prompt:', prompt);
//     console.log('Using API URL:', API_URL);
    
//     const response = await axios({
//       method: 'post',
//       url: `${API_URL}?key=${GEMINI_API_KEY}`,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: {
//         contents: [{
//           parts: [{
//             text: prompt
//           }]
//         }]
//       }
//     });

//     console.log('Received response:', JSON.stringify(response.data, null, 2));

//     if (response.data && response.data.candidates && response.data.candidates[0]?.content?.parts?.[0]?.text) {
//       return response.data.candidates[0].content.parts[0].text;
//     }

//     console.error('Unexpected response format:', response.data);
//     throw new Error('Invalid response format from Gemini API');
//   } catch (error) {
//     console.error('Full error details:', {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status,
//       headers: error.response?.headers
//     });

//     if (error.response?.status === 401) {
//       throw new Error('Invalid API key. Please check your GEMINI_API_KEY in the .env file');
//     } else if (error.response?.status === 400) {
//       throw new Error('Bad request. Please check the prompt format');
//     } else if (error.response?.status === 403) {
//       throw new Error('API key does not have permission to access Gemini API');
//     } else if (error.response?.status === 429) {
//       throw new Error('Too many requests. Please try again later');
//     }
    
//     throw error;
//   }
// };

// const generateLessonPlan = async (subject, classLevel, chapter) => {
//   const prompt = `Create a detailed lesson plan for teaching ${chapter} in ${subject} for class ${classLevel}.
// Include:
// 1. Learning Objectives
// 2. Required Materials
// 3. Introduction (10 minutes)
// 4. Main Content (30 minutes)
// 5. Activities (15 minutes)
// 6. Assessment/Recap (5 minutes)
// 7. Homework Ideas`;
//   return generateContent(prompt);
// };

// const generateQuiz = async (subject, classLevel, chapter) => {
//   const prompt = `Create a quiz for ${chapter} in ${subject} for class ${classLevel}.
// Include:
// 1. 5 Multiple Choice Questions
// 2. 3 Short Answer Questions
// 3. 2 Long Answer Questions
// Include answers for all questions.`;
//   return generateContent(prompt);
// };

// const generateHomework = async (subject, classLevel, chapter) => {
//   const prompt = `Create homework assignments for ${chapter} in ${subject} for class ${classLevel}.
// Include:
// 1. Practice Problems
// 2. Research Topics
// 3. Creative Projects
// 4. Due Date Suggestions
// 5. Grading Criteria`;
//   return generateContent(prompt);
// };

// export const aiService = {
//   generateLessonPlan,
//   generateQuiz,
//   generateHomework
// }; 



import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const generateContent = async (prompt) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key') {
    throw new Error(
      '❌ Invalid GEMINI_API_KEY. Please update your .env file with the real key from Google AI Studio.'
    );
  }

  try {
    console.log('📤 Sending request to Gemini API...');
    const response = await axios.post(
      `${API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!text) {
      console.error('⚠️ Unexpected API response:', response.data);
      throw new Error('Invalid response format from Gemini API');
    }

    return text;
  } catch (error) {
    console.error('❌ Gemini API Error:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message,
    });

    if (error.response?.status === 400) {
      throw new Error('Bad request: Check your prompt format.');
    }
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: Invalid GEMINI_API_KEY.');
    }
    if (error.response?.status === 403) {
      throw new Error('Forbidden: API key has no permission for Gemini API.');
    }
    if (error.response?.status === 429) {
      throw new Error('Too many requests: Try again later.');
    }

    throw error;
  }
};

export const aiService = {
  generateLessonPlan: (subject, classLevel, chapter) =>
    generateContent(
      `Create a detailed lesson plan for teaching ${chapter} in ${subject} for class ${classLevel}.
Include:
1. Learning Objectives
2. Required Materials
3. Introduction (10 minutes)
4. Main Content (30 minutes)
5. Activities (15 minutes)
6. Assessment/Recap (5 minutes)
7. Homework Ideas`
    ),

  generateQuiz: (subject, classLevel, chapter) =>
    generateContent(
      `Create a quiz for ${chapter} in ${subject} for class ${classLevel}.
Include:
1. 5 Multiple Choice Questions
2. 3 Short Answer Questions
3. 2 Long Answer Questions
Include answers for all questions.`
    ),

  generateHomework: (subject, classLevel, chapter) =>
    generateContent(
      `Create homework assignments for ${chapter} in ${subject} for class ${classLevel}.
Include:
1. Practice Problems
2. Research Topics
3. Creative Projects
4. Due Date Suggestions
5. Grading Criteria`
    ),
};
