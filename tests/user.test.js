const { validateRequestBody } = require("../controllers/UserSearchController");
const { fetchSchemaFromUrl } = require("../controllers/UserSearchController");
const {
  readSchemaFromLocalFile,
} = require("../controllers/UserSearchController");
const { validateFields } = require("../controllers/UserSearchController");
const {
  buildQuery,
  fetchAndProcessSchema,
} = require("../controllers/UserSearchController");

const axios = require("axios");
const fs = require("fs");
jest.mock("fs");
jest.mock("axios");

describe("validateRequestBody", () => {
  it("should not return an error for a valid request body", async () => {
    const mockRequest = {
      body: {
        request: {
          search: {},
        },
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const result = await validateRequestBody(mockRequest, mockResponse);

    expect(result).toBeNull();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should return a 400 error for an invalid request body", async () => {
    const mockRequest = {
      body: {},
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await validateRequestBody(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});

describe("fetchSchemaFromUrl", () => {
  it("should successfully fetch schema from the URL", async () => {
    const mockSchema = { schema: "mock-schema" };
    axios.get.mockResolvedValue({ data: mockSchema });

    const result = await fetchSchemaFromUrl(
      "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json"
    );

    expect(result).toEqual(mockSchema);
    expect(axios.get).toHaveBeenCalledWith(
      "https://raw.githubusercontent.com/soumya-maheshwari/Schema/main/user_schema.json"
    );
  });

  it("should throw an error when fetching schema fails", async () => {
    const mockError = new Error("Network Error");
    axios.get.mockRejectedValue(mockError);

    await expect(
      fetchSchemaFromUrl("https://example.com/schema")
    ).rejects.toThrow("Network Error");

    expect(axios.get).toHaveBeenCalledWith("https://example.com/schema");
  });
});

describe("readSchemaFromLocalFile", () => {
  it("should successfully read and parse schema from a local file", () => {
    const mockFilePath = "path/to/mock/file.json";
    const mockFileContent = JSON.stringify({ schema: "mock-schema" });
    fs.readFileSync.mockReturnValue(mockFileContent);

    const result = readSchemaFromLocalFile(mockFilePath);

    expect(result).toEqual({ schema: "mock-schema" });
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath);
  });

  it("should throw an error when reading the file fails", () => {
    const mockFilePath = "path/to/mock/file.json";
    const mockError = new Error("File not found");
    fs.readFileSync.mockImplementation(() => {
      throw mockError;
    });

    expect(() => readSchemaFromLocalFile(mockFilePath)).toThrow(
      "File not found"
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath);
  });
});

describe("fetchAndProcessSchema", () => {
  let fetchSchemaFromUrlSpy;
  let readSchemaFromLocalFileSpy;

  beforeEach(() => {
    delete process.env.SCHEMA_PATH;

    readSchemaFromLocalFileSpy = jest.spyOn(
      require("../controllers/UserSearchController"),
      "readSchemaFromLocalFile"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should handle errors when reading schema from local file fails", async () => {
    process.env.SCHEMA_PATH = "schemas/user_schema.json";
    const mockError = new Error("File not found");

    readSchemaFromLocalFileSpy.mockImplementation(() => {
      throw mockError;
    });

    await expect(fetchAndProcessSchema()).rejects.toThrow("File not found");
  });
});

describe("validateFields", () => {
  const validFields = ["userId", "courseId", "location", "batchEnrollmentDate"];

  it("should not throw an error for valid fields", async () => {
    const fields = ["userId", "courseId", "location", "batchEnrollmentDate"];
    await expect(validateFields(fields, validFields)).resolves.toBeUndefined();
  });

  it("should throw an error for invalid fields", async () => {
    const fields = [
      "userId",
      "invalidField",
      "location",
      "batchEnrollmentDate",
    ];

    await expect(validateFields(fields, validFields)).rejects.toThrow(
      "Invalid fields: invalidField"
    );
  });
});

describe("buildQuery", () => {
  const config = {
    fields_allowed_to_be_in_range: ["dateField", "progress"],
  };

  const properties = {
    userId: { type: "string", required: true },
    location: { type: "string", required: true },
    progress: { type: "number", required: true },
    dateField: { type: "date" },
    dateValue: {
      type: "date",
    },
  };
  const validFields = [
    "userId",
    "location",
    "progress",
    "dateField",
    "dateValue",
  ];
  it("should build a query for valid date range fields", () => {
    const filter = {
      dateField: {
        min: "2023-01-01T00:00:00.000Z",
        max: "2023-12-31T23:59:59.999Z",
      },
    };

    const expectedQuery = {
      dateField: {
        $gte: "2023-01-01T00:00:00.000Z",
        $lte: "2023-12-31T23:59:59.999Z",
      },
    };

    const query = buildQuery(filter, config, properties, validFields);
    console.log(query);
    expect(query).toEqual(expectedQuery);
  });

  it("should build a query for valid date range fields", () => {
    const filter = {
      userId: "example",
    };

    const expectedQuery = {
      userId: "example",
    };
    const query = buildQuery(filter, config, properties, validFields);
    console.log(query);
    expect(query).toEqual(expectedQuery);
  });

  it("should throw an error for an invalid field in the filter", () => {
    const filter = {
      invalidField: {
        min: "2023-01-01T00:00:00.000Z",
        max: "2023-01-01T00:00:00.000Z",
      },
    };

    expect(() => buildQuery(filter, config, properties, validFields)).toThrow(
      "Invalid field: invalidField"
    );
  });

  it("should build a query for valid date range fields", () => {
    const filter = {
      progress: {
        min: 10,
        max: 90,
      },
    };

    const expectedQuery = {
      progress: {
        $gte: 10,
        $lte: 90,
      },
    };

    const query = buildQuery(filter, config, properties, validFields);
    console.log(query);
    expect(query).toEqual(expectedQuery);
  });

  it("should build a query for valid value", () => {
    const filter = {
      location: "Delhi",
    };

    const expectedQuery = {
      location: "Delhi",
    };

    const query = buildQuery(filter, config, properties, validFields);
    console.log(query);
    expect(query).toEqual(expectedQuery);
  });

  it("should build a query for valid date value", () => {
    const filter = {
      dateField: "2024-08-18",
    };
    const expectedQuery = {
      dateField: {
        $gte: "2024-08-18T00:00:00.000Z",
        $lte: "2024-08-18T23:59:59.999Z",
      },
    };
    const query = buildQuery(filter, config, properties, validFields);
    console.log(query);
    expect(query).toEqual(expectedQuery);
  });
});
