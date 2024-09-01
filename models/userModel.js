const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

let cachedModel = null;

const convertJsonSchemaToMongooseSchema = (jsonSchema) => {
  const mongooseSchema = {};

  for (const key in jsonSchema.properties) {
    const property = jsonSchema.properties[key];
    const typeMapping = {
      string: String,
      number: Number,
      date: Date,
      array: Array,
      object: Object,
    };

    const fieldSchema = {
      type: typeMapping[property.type],
    };

    if (property.required) {
      fieldSchema.required = property.required;
    }

    if (property.enum) {
      fieldSchema.enum = property.enum;
    }

    if (property.type === "array" && property.items) {
      fieldSchema.items = convertJsonSchemaToMongooseSchema({
        type: "object",
        properties: property.items.properties,
      });
    }

    mongooseSchema[key] = fieldSchema;
  }
  return mongooseSchema;
};

async function fetchSchemaFromUrl(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching schema from URL:", error);
    throw error;
  }
}

async function fetchSchemaFromLocalFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading or parsing the schema file:", err);
    throw err;
  }
}

async function getSchema() {
  const SCHEMA_PATH = process.env.SCHEMA_PATH;

  if (!SCHEMA_PATH) {
    throw new Error("SCHEMA_PATH is not defined");
  }

  let jsonSchema;
  if (SCHEMA_PATH.startsWith("http://") || SCHEMA_PATH.startsWith("https://")) {
    jsonSchema = await fetchSchemaFromUrl(SCHEMA_PATH);
  } else {
    const fullPath = path.resolve(__dirname, SCHEMA_PATH);
    jsonSchema = await fetchSchemaFromLocalFile(fullPath);
  }

  return jsonSchema;
}

async function createUserModel() {
  if (cachedModel) {
    return cachedModel;
  }

  const jsonSchema = await getSchema();

  if (!jsonSchema) {
    throw new Error("Failed to load JSON schema");
  }

  const mongooseSchema = new mongoose.Schema(
    convertJsonSchemaToMongooseSchema(jsonSchema.schema)
  );

  cachedModel = mongoose.models.User || mongoose.model("User", mongooseSchema);
  return cachedModel;
}

module.exports = {
  createUserModel,
  getSchema,
  fetchSchemaFromLocalFile,
  fetchSchemaFromUrl,
};
