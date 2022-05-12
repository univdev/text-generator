module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
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
        "@typescript-eslint/no-var-requires": "off",
        "vue/no-v-model-argument": "off",
        "vue/component-tags-order": [
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
