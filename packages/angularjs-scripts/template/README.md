## AngularJS Starter

Starting point for a new AngularJS 1.x application using [angularjs-scripts](https://github.com/fostertheweb/angularjs-scripts)

### How to get started

1. Clone this repository
2. Change the `name` field within `package.json`
3. Update the git remote url:
```
git remote origin set-url <url>
```
4. Run `npm install`

### Style Guide

AngularJS Starter includes [ESLint](https://eslint.org) and it follows the [Todd Motto AngularJS Styleguide](https://github.com/toddmotto/angularjs-styleguide)

If you need to learn ES2015/ES6 JavaScript syntax, reference the resources below:

- [Learn ES6 (ECMAScript 2015)](https://egghead.io/courses/learn-es6-ecmascript-2015) (egghead.io video course)
- [How to Learn ES6](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620)
- [ES6 Overview in 350 Bullet Points](https://ponyfoo.com/articles/es6)

### Available Commands

Start local development server:
```
npm run serve
```

Build assets for deployment:
```
npm run build
```

Run unit testing framework (Karma & Jasmine):
```
npm run test
```

View all available commands:
```
npm run
```

### Environment Variables & `.env`

Any variables defined in `.env` within the project's root directory will be read by webpack and converted to their corresponding value within the compiled bundle. This will allow you to specify any environment specific configuration, such as, an API URL.

