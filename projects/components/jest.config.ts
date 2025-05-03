export default {
    moduleFileExtensions: ["ts", "html", "js", "json"],
    preset: "jest-preset-angular",
    testEnvironment: "jsdom",
    testMatch: ["**/*.spec.ts"],
    transform: {
        "^.+\\.(ts|js|html)$": "jest-preset-angular",
    }
};
