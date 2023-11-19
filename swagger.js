const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Restfull API (For Tech Sake: Inventory Management)",
    description: "NodeJS Express + Postgresql API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index.js");
});
