const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const SCHEMA_PATH = process.env.SCHEMA_PATH;

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

async function readSchemaFromLocalFile(SCHEMA_PATH) {
  try {
    const data = fs.readFileSync(SCHEMA_PATH);
    jsonSchema = JSON.parse(data).schema;
  } catch (err) {
    console.error("Error reading or parsing the schema file:", err);
    process.exit(1);
  }
}

let jsonSchema;
const getSchema = async () => {
  console.log(SCHEMA_PATH);
  if (SCHEMA_PATH.startsWith("http://") || SCHEMA_PATH.startsWith("https://")) {
    jsonSchema = await fetchSchemaFromUrl(SCHEMA_PATH);
  } else {
    const fullPath = path.resolve(__dirname, SCHEMA_PATH);
    console.log(fullPath);
    jsonSchema = await readSchemaFromLocalFile(fullPath);
  }
};
getSchema();

console.log(jsonSchema, "json schema");

const mongooseSchema = new mongoose.Schema(
  convertJsonSchemaToMongooseSchema(jsonSchema)
);

const User = mongoose.model("User", mongooseSchema);

module.exports = User;
