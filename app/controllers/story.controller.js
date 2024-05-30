const db = require('../models');
const Story = db.story;
const User = db.user;
const Category = db.category;
const StoryCountry = db.storyCountry;
const StoryRole = db.storyRole;
const Narrative = db.narrative;
const Configuration = db.configuration;
const Language = db.language;
const { generateStoryUsingLLM } = require("../utils/storyUtils")

// Create and save a new story
exports.create = async (req, res) => {
    try {
        const { title, userId, categoryId, storyCountryId, storyRoleId, narrativeId, configurationId, languageId } = req.body;

        if ( !title || !userId || !categoryId || !storyCountryId || !storyRoleId || !narrativeId || !configurationId || !languageId) {
            throw new Error("All required fields must be provided");
        }

        const [user, category, storyCountry, storyRole, narrative, configuration, language] = await Promise.all([
            User.findByPk(userId),
            Category.findByPk(categoryId),
            StoryCountry.findByPk(storyCountryId),
            StoryRole.findByPk(storyRoleId),
            Narrative.findByPk(narrativeId),
            Configuration.findByPk(configurationId),
            Language.findByPk(languageId)
        ]);

        if (!user || !category || !storyCountry || !storyRole || !narrative || !configuration || !language) {
            throw new Error("One or more associated entities not found in the database");
        }

        const storyData = {
            category: category.name,
            storyCountry: storyCountry.name,
            storyRole: storyRole.name,
            narrative: narrative.name,
            configuration: configuration.name,
            language: language.name,
            title: title
        };

        // Call the function to generate story using LLM with the created JSON object
        const generatedStory = await generateStoryUsingLLM(storyData);

        // Create the story object with the generated title and content
        const story = {
            userId,
            categoryId,
            storyCountryId,
            storyRoleId,
            narrativeId,
            configurationId,
            languageId,
            title: generatedStory.title,
            content: generatedStory.content,
            publication_date: new Date()
        };

        // Create the story in the database
        const createdStory = await Story.create(story);

        // Return the created story to the user
        res.status(201).json(createdStory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all stories from the database
exports.findAll = async (req, res) => {
  try {
    const stories = await Story.findAll();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a single story with an ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const story = await Story.findByPk(id,{
      include: [
        { model: Category, as: 'category' },
        { model: StoryCountry, as: 'storyCountry' },
        { model: StoryRole, as: 'storyRole' },
        { model: Narrative, as: 'narrative' },
        { model: Configuration, as: 'configuration' },
        { model: Language, as: 'language' },
      ]
    });
    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ message: `Story with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stories by user ID
exports.findByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const stories = await Story.findAll({ where: { userId: userId } });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
