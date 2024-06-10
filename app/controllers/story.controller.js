const db = require('../models');
const Story = db.story;
const User = db.user;
const Category = db.category;
const StoryCountry = db.storyCountry;
const StoryRole = db.storyRole;
const Narrative = db.narrative;
const Configuration = db.configuration;
const Language = db.language;
const { generateStoryUsingLLM, updateStoryUsingLLM, translateUsingLLM } = require("../utils/storyUtils")

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
        // Add more includes for other foreign key relationships if needed
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

// Update a story by the ID in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, content, categoryId, storyCountryId, storyRoleId, narrativeId, configurationId, languageId } = req.body;

    // Fetching the necessary details if provided
    const category = categoryId ? await Category.findByPk(categoryId) : null;
    const storyCountry = storyCountryId ? await StoryCountry.findByPk(storyCountryId) : null;
    const storyRole = storyRoleId ? await StoryRole.findByPk(storyRoleId) : null;
    const narrative = narrativeId ? await Narrative.findByPk(narrativeId) : null;
    const configuration = configurationId ? await Configuration.findByPk(configurationId) : null;
    const language = languageId ? await Language.findByPk(languageId) : null;

    if (languageId && !categoryId && !storyCountryId && !storyRoleId && !narrativeId && !configurationId) {
      // Only languageId is provided, proceed with translation
      const story = await Story.findByPk(id,{
        include: [
          { model: Language, as: 'language' }]});
      if (!story) {
        return res.status(404).json({ message: `Story with ID ${id} not found` });
      }

      const translatedContent = await translateUsingLLM(story, language.name);
      await Story.update({ content: translatedContent, languageId }, { where: { id } });

      return res.status(200).json({ message: `Story with ID ${id} translated successfully` });
    } else {
      // Validate foreign keys if provided
      if (!category || !storyCountry || !storyRole || !narrative || !configuration || !language) {
        return res.status(400).json({ message: "Invalid foreign key ID(s) provided" });
      }

      const updateStoryDetails = {
        category: category.name,
        storyCountry: storyCountry.name,
        storyRole: storyRole.name,
        narrative: narrative.name,
        configuration: configuration.name,
        language: language.name,
        content,
        title
      };

      const updatedStory = await updateStoryUsingLLM(updateStoryDetails);

      const [updated] = await Story.update(
        { ...req.body, content: updatedStory.content },
        { where: { id } }
      );

      if (updated) {
        res.status(200).json({ message: `Story with ID ${id} updated successfully` });
      } else {
        res.status(404).json({ message: `Story with ID ${id} not found` });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a story with the specified ID in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Story.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(200).json({ message: `Story with ID ${id} deleted successfully` });
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

// Get stories by category ID
exports.findByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const stories = await Story.findAll({ where: { categoryId: categoryId } });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stories by country ID
exports.findByCountryId = async (req, res) => {
    const countryId = req.params.countryId;
    try {
      const stories = await Story.findAll({ where: { storyCountryId: countryId } });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get stories by role ID
  exports.findByRoleId = async (req, res) => {
    const roleId = req.params.roleId;
    try {
      const stories = await Story.findAll({ where: { storyRoleId: roleId } });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get stories by narrative ID
  exports.findByNarrativeId = async (req, res) => {
    const narrativeId = req.params.narrativeId;
    try {
      const stories = await Story.findAll({ where: { narrativeId: narrativeId } });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get stories by configuration ID
  exports.findByConfigurationId = async (req, res) => {
    const configurationId = req.params.configurationId;
    try {
      const stories = await Story.findAll({ where: { configurationId: configurationId } });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get stories by language ID
  exports.findByLanguageId = async (req, res) => {
    const languageId = req.params.languageId;
    try {
      const stories = await Story.findAll({ where: { languageId: languageId } });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };