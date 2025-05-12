const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Get all model files
const getModelFiles = () => {
    const modelsDir = path.join(process.cwd(), 'src', 'app', 'models');
    const files = fs.readdirSync(modelsDir);

    return files
        .filter(file => file.endsWith('.js') && file !== '.DS_Store')
        .map(file => ({
            name: file.replace('.js', ''),
            path: path.join(modelsDir, file),
            modelName: file.replace('.js', '')
        }));
};

// Get model structure
const getModelStructure = (modelName) => {
    try {
        const model = mongoose.model(modelName);
        const schema = model.schema;
        const paths = schema.paths;

        const structure = {};

        for (const pathName in paths) {
            if (pathName === '__v' || pathName === '_id') continue;

            const pathConfig = paths[pathName];

            structure[pathName] = {
                type: pathConfig.instance,
                required: !!pathConfig.isRequired,
                ref: pathConfig.options.ref,
                enum: pathConfig.enumValues,
                default: pathConfig.defaultValue,
                isArray: Array.isArray(pathConfig.options.type),
            };
        }

        return structure;
    } catch (error) {
        console.error(`Error getting structure for model ${modelName}:`, error);
        return null;
    }
};

// Get relationships between models
const getModelRelationships = () => {
    const relationships = {};
    const models = mongoose.modelNames();

    models.forEach(modelName => {
        const model = mongoose.model(modelName);
        const schema = model.schema;
        const paths = schema.paths;

        relationships[modelName] = {};

        for (const pathName in paths) {
            const path = paths[pathName];

            // Check if this is a reference to another model
            if (path.options && path.options.ref) {
                if (!relationships[modelName].hasOwnProperty('references')) {
                    relationships[modelName].references = [];
                }

                relationships[modelName].references.push({
                    field: pathName,
                    model: path.options.ref,
                    isArray: Array.isArray(path.options.type)
                });
            }

            // Check if this is an array of references
            if (path.instance === 'Array' &&
                path.schema &&
                path.schema.paths &&
                path.schema.paths.type &&
                path.schema.paths.type.options &&
                path.schema.paths.type.options.ref) {
                if (!relationships[modelName].hasOwnProperty('references')) {
                    relationships[modelName].references = [];
                }

                relationships[modelName].references.push({
                    field: pathName,
                    model: path.schema.paths.type.options.ref,
                    isArray: true
                });
            }
        }

        if (Object.keys(relationships[modelName]).length === 0) {
            delete relationships[modelName];
        }
    });

    return relationships;
};

// Export functions
module.exports = {
    getModelFiles,
    getModelStructure,
    getModelRelationships
}; 