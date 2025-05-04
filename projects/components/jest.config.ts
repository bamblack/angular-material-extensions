export default {
    moduleFileExtensions: ["ts", "html", "js", "json"],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/projects/components/jest.setup.ts"],
    testEnvironment: "jsdom",
    testMatch: ["**/*.spec.ts"],
    transform: {
        "^.+\\.(ts|js|html)$": "jest-preset-angular",
    }
};
