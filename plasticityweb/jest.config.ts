import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: false,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!react-markdown/)"],
};
export default config;
// --transformIgnorePatterns \"node_modules/(?!react-markdown)/\"
// /node_modules/react-markdown/
