module.exports = {
    "root": true,
    "ignorePatterns": ["**/*"],
    "plugins": ["@typescript-eslint/eslint-plugin", "unused-imports", "import", "jest"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false
        },
        tsconfigRootDir: __dirname,
        project: [
            "./tsconfig.base.json"
        ]
    },
    "env": {
        "es2021": true,
        "jest/globals": true,
        "node": true
    },
    "settings": {
        "node": {
            "tryExtensions": [".ts"]
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

                // // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

                // // use <root>/path/to/folder/tsconfig.json
                // "project": "path/to/folder",

                // // Multiple tsconfigs (Useful for monorepos)

                // // use a glob pattern
                // "project": "packages/*/tsconfig.json",

                // // use an array
                // "project": ["packages/module-a/tsconfig.json", "packages/module-b/tsconfig.json"],

                // // use an array of glob patterns
                project: ["apps/*/tsconfig.json", "libs/*/tsconfig.json"]
            }
        }
    },
    "overrides": [
        // Configuration for test files
        {
            "files": ["test/**/*.ts"],
            "rules": {
                "no-console": "off"
            }
        },
        {
            "files": ["*.ts", "*.tsx"],
            "extends": [
                "eslint:recommended",
                "plugin:node/recommended",
                "plugin:prettier/recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": ["error"],
                "import/prefer-default-export": "off",
                "import/order": [
                    "error",
                    {
                        "groups": ["builtin", "external", "internal"],
                        "pathGroups": [
                            {
                                "pattern": "react",
                                "group": "external",
                                "position": "before"
                            }
                        ],
                        "pathGroupsExcludedImportTypes": ["react"],
                        "newlines-between": "always",
                        "alphabetize": {
                            "order": "asc",
                            "caseInsensitive": true
                        }
                    }
                ],
                "no-useless-constructor": "off",
                "@typescript-eslint/no-useless-constructor": ["error"],
                "node/no-unsupported-features/es-syntax": [
                    "error",
                    {
                        "version": ">=13.0.0",
                        "ignores": ["modules"]
                    }
                ],
                "node/no-unpublished-import": [
                    "error",
                    {
                        "allowModules": ["msw", "aws-sdk-mock", "jest-dynalite"]
                    }
                ],
                // "node/no-missing-import": [
                //     "error",
                //     {
                //         "allowModules": ["msw", "aws-sdk", "jest-dynalite"]
                //     }
                // ],
                "node/no-missing-import": "off",
                "import/no-unresolved": "error",
                "node/no-extraneous-import": "off",
                "prettier/prettier": ["warn"],
                "react/jsx-filename-extension": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": ["error", {"argsIgnorePattern": "^_", "ignoreRestSiblings": true}],
                "@typescript-eslint/no-unused-vars": ["error", {"argsIgnorePattern": "^_", "ignoreRestSiblings": true}]
            }
        }
    ]
}
