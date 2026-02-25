export default {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    // --- General code cleanliness rules ---
    "block-no-empty": null,
    "rule-empty-line-before": null,
    "declaration-empty-line-before": null,

    // --- Color notation rules ---
    "alpha-value-notation": ["number", { severity: "warning" }],
    "color-function-notation": ["modern", { severity: "warning" }],
    "color-function-alias-notation": null,
    "color-hex-length": null,

    // --- Value case rules ---
    "value-keyword-case": ["lower", { severity: "warning" }],

    // --- SCSS-specific rules ---
    "scss/double-slash-comment-empty-line-before": null,
    "scss/dollar-variable-empty-line-before": null,
    "scss/load-partial-extension": null,

    // --- At-rule rules ---
    "at-rule-empty-line-before": null,

    // --- Custom class naming convention ---
    "selector-class-pattern": null,
    "no-descending-specificity": null
  }
};
