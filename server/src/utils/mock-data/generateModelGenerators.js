const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { getModelFiles, getModelStructure } = require('./modelScanner');

// Template for generating a model generator file
const generatorTemplate = (modelName) => `
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const BaseGenerator = require('./baseGenerator');

class ${modelName}Generator extends BaseGenerator {
  constructor() {
    super('${modelName}');
  }

  async generateOne() {
    // Get model structure
    const data = {};
    
    // TODO: Add specific field generation logic for ${modelName}
    
    return await this.saveDocument(data);
  }
}

const generate${modelName}s = async (count = 50) => {
  const generator = new ${modelName}Generator();
  return await generator.generate(count);
};

module.exports = {
  generate${modelName}s,
  ${modelName}Generator
};
`.trim();

const generateModelGenerators = async () => {
    console.log('🔍 Scanning models directory...');
    const modelFiles = getModelFiles();
    console.log(`Found ${modelFiles.length} model files.`);

    const generatorsDir = path.join(process.cwd(), 'src', 'utils', 'mock-data', 'generators');

    // Ensure generators directory exists
    if (!fs.existsSync(generatorsDir)) {
        fs.mkdirSync(generatorsDir, { recursive: true });
    }

    // Check which models don't have generators yet
    for (const modelFile of modelFiles) {
        const modelName = modelFile.name;
        const generatorPath = path.join(generatorsDir, `${modelName.toLowerCase()}Generator.js`);

        if (!fs.existsSync(generatorPath)) {
            console.log(`Generating generator for model: ${modelName}`);

            try {
                // Generate the generator file
                const generatorCode = generatorTemplate(modelName);

                // Write the file
                fs.writeFileSync(generatorPath, generatorCode);
                console.log(`Created: ${path.relative(process.cwd(), generatorPath)}`);
            } catch (error) {
                console.error(`Error creating generator for ${modelName}:`, error);
            }
        } else {
            console.log(`Generator already exists for ${modelName}`);
        }
    }

    console.log('✅ Generator creation process completed!');
};

// Check if this file is being executed directly
if (require.main === module) {
    generateModelGenerators()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = {
    generateModelGenerators
}; 