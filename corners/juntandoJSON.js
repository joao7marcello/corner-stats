const fs = require("fs");

// Array to store the JSON data from multiple files
const combinedData = [];

// List of file names (change these to your file names)
const fileNames = [
  "data.json",
  "data (1).json",
  "data (2).json",
  "data (3).json",
];

// Read and combine data from each file
fileNames.forEach((fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    const jsonData = JSON.parse(data);

    // Function to transform negative numbers to positive numbers
    const transformToPositive = (number) => {
      if (typeof number === "number" && number < 0) {
        return Math.abs(number);
      }
      return number;
    };

    // Iterate through the JSON data and transform negative numbers
    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        const team = jsonData[key];
        if (team && team.cornersGet && Array.isArray(team.cornersGet)) {
          team.cornersGet = team.cornersGet.map(transformToPositive);
        }
        if (team && team.cornersLost && Array.isArray(team.cornersLost)) {
          team.cornersLost = team.cornersLost.map(transformToPositive);
        }
      }
    }

    combinedData.push(jsonData);
  } catch (error) {
    console.error(`Error reading ${fileName}: ${error.message}`);
  }
});

// Write the combined data to a new JSON file
const combinedFileName = "combinedTeste.json";
fs.writeFileSync(
  combinedFileName,
  JSON.stringify(combinedData, null, 2),
  "utf8"
);

console.log(`Combined data written to ${combinedFileName}`);
