# pipe vs compose

For some reasom I've thought I needed a function for doing function composition.
My real intention was to use something to pipe results from one computation to another as composition passes the value from right to left.

This article about [Pipe Function in JavaScript](https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e) has provided help in remembering what I wanted to achieve.

In fact I have seen this many times before in [staltz/callbag-pipe](https://github.com/staltz/callbag-pipe) and RxJS.

# AST Analysis

- [eslint/generator-eslint](https://github.com/eslint/generator-eslint) Yeoman generator ofr ESLint plugins and rules.
- [Writing Custom Lint Rules for Your Picky Developers](https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803) article about writing a simple ESLint rule.
- [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules) official ESLint docs about writing rules.
