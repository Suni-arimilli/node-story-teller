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
    let prompt = 'Generate a story';
    if (storyData.narrative) {
    prompt += ` with a ${storyData.narrative} narrative`;
    }
    if (storyData.title) {
    prompt += ` titled "${storyData.title}"`;
    }
    if (storyData.category) {
    prompt += ` in the theme ${storyData.category}`;
    }
    if (storyData.storyRole) {
    prompt += ` for the role ${storyData.storyRole}`;
    }
    if (storyData.language) {
    prompt += ` in the language ${storyData.language}`;
    }
    if (storyData.configuration) {
    prompt += ` which takes place in ${storyData.configuration}`;
    }
    if (storyData.storyCountry) {
    prompt += ` and is set in ${storyData.storyCountry}`;
    }
    prompt += '.';

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

exports.updateStoryUsingLLM = async (storyData) => {
    try {
        console.log("update LLM")
        const updatedStory = await this.generateStoryUsingLLM(storyData);
        return updatedStory;
    } 
    catch(error) {
        throw new Error(`Error generating story: ${error.message}`);
    }

};

exports.translateUsingLLM = async (story,language) => {
    console.log("translate LLM")
    // Construct a translate story prompt based on the provided story content
    const prompt = `Please translate the following story into ${language} language. 

                    Original story (in ${story.language.name}):
                    "${story.content}"
                    `;

    console.log("translate prompt",prompt)

    try {
        const response = await openAi.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": prompt}],
          max_tokens: 500
        })
        console.log("response",JSON.stringify(response))
        const storyContent = response.choices[0].message.content.trim();

        // Return the translated story content
        return storyContent;
    } catch (error) {
        // Check if the error response exists and has a response property
        if (error.response) {
            console.error('Error translating story story:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data
            });
            throw new Error(`Error translating story story: ${error.response.data.error.message}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error translating story story:', {
                request: error.request
            });
            throw new Error('Error translating story story: No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error translating story story:', {
                message: error.message
            });
            throw new Error(`Error translating story story: ${error.message}`);
        }
    }

};