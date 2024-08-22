const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User Search Api",
    description: "Api Documentation for Flexible User Data Retreival Api",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output-autogen.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
