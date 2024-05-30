const OpenAI = require('openai');
require('dotenv').config();

const chatGptApiKey = process.env.CHATGPT_API_KEY || "";
// const core = require('@actions/core');

// const apiKey = core.getInput('CHAT_GPT_API_KEY') || "";

const openAi = new OpenAI({
  apiKey: chatGptApiKey
})

exports.generateStoryUsingLLM = async (storyData) => {

    // Construct a generic story prompt based on the provided story data
    const prompt = `Generate a ${storyData.narrative} story with title as ${storyData.title} in Theme ${storyData.category} for role ${storyData.storyRole} in language ${storyData.language} which takes place in ${storyData.configuration}, and story should be in ${storyData.storyCountry}.`;

    try {
        const response = await openAi.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": prompt}],
          max_tokens: 500
        })
        console.log("response",JSON.stringify(response))
        const storyContent = response.choices[0].message.content.trim();

        // Return the generated story title and content
        return { title: storyData.title, content: storyContent };
    } catch (error) {
        // Check if the error response exists and has a response property
        if (error.response) {
            console.error('Error generating story:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data
            });
            throw new Error(`Error generating story: ${error.response.data.error.message}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error generating story:', {
                request: error.request
            });
            throw new Error('Error generating story: No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error generating story:', {
                message: error.message
            });
            throw new Error(`Error generating story: ${error.message}`);
        }
    }
};

