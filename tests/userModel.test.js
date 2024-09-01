require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
  createUserModel,
  getSchema,
  fetchSchemaFromLocalFile,
  fetchSchemaFromUrl,
} = require("../models/userModel");

jest.mock("axios");
jest.mock("fs");

describe("User Model Creation", () => {
  afterEach(() => {
    delete process.env.SCHEMA_PATH;
  });

  describe("fetchSchemaFromUrl", () => {
    it("should fetch schema from a valid URL", async () => {
      const mockSchema = { schema: { properties: {} } };
      axios.get.mockResolvedValue({ data: mockSchema });

      const result = await fetchSchemaFromUrl(
        "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json"
      );
      expect(result).toEqual(mockSchema);
      expect(axios.get).toHaveBeenCalledWith(
        "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json"
      );
    });

    it("should throw an error if fetching schema fails", async () => {
      axios.get.mockRejectedValue(new Error("Fetch error"));

      await expect(
        fetchSchemaFromUrl(
          "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json"
        )
      ).rejects.toThrow("Fetch error");
    });
  });

  describe("fetchSchemaFromLocalFile", () => {
    it("should read and parse schema from a local file", async () => {
      const mockSchema = { schema: { properties: {} } };
      fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));

      const result = await fetchSchemaFromLocalFile("path/to/schema.json");
      expect(result).toEqual(mockSchema);
      expect(fs.readFileSync).toHaveBeenCalledWith("path/to/schema.json");
    });

    it("should throw an error if reading the file fails", async () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("File read error");
      });

      await expect(
        fetchSchemaFromLocalFile("path/to/schema.json")
      ).rejects.toThrow("File read error");
    });
  });

  describe("getSchema", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should fetch schema from a URL when SCHEMA_PATH is a URL", async () => {
      const mockSchema = { schema: { properties: {} } };
      process.env.SCHEMA_PATH =
        "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json";
      axios.get.mockResolvedValue({ data: mockSchema });

      const result = await getSchema();
      expect(result).toEqual(mockSchema);
      expect(axios.get).toHaveBeenCalledWith(process.env.SCHEMA_PATH);
    });

    it("should read schema from a local file when SCHEMA_PATH is a local path", async () => {
      const mockSchema = { schema: { properties: {} } };
      process.env.SCHEMA_PATH = "../schema/user_schema.json";
      fs.readFileSync.mockReturnValue(JSON.stringify(mockSchema));

      const result = await getSchema();
      expect(result).toEqual(mockSchema);
      expect(fs.readFileSync).toHaveBeenCalledWith(
        path.resolve(__dirname, process.env.SCHEMA_PATH)
      );
    });

    it("should throw an error if SCHEMA_PATH is not defined", async () => {
      delete process.env.SCHEMA_PATH;
      await expect(getSchema()).rejects.toThrow("SCHEMA_PATH is not defined");
    });
  });
});
