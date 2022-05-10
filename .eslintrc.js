module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/order-tags-component": [
            "error",
            {
                order: ["style", "template", "script"]
            },
        ],
        "vue/html-self-closing": [
            "error",
            {
                "html": {
                    "void": "never",
                    "normal": "always",
                    "component": "always"
                  },
                  "svg": "always",
                  "math": "always"
            }
        ],
    }
}
