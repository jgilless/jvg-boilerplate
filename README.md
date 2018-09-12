# Boilerplate

### Features:

-   [Babel](#babel)
-   [ESLint](#eslint)
-   [Husky](#husky)
-   [Jest](#jest)
-   [Lint Staged](#lint-staged)
-   [Path](#path)
-   [Prettier](#prettier)
-   [Webpack](#webpack)
-   [Webppack Serve](#webpack-serve)

### TODO:

-   Chunking for caching https://webpack.js.org/guides/caching/
-   CSS Support (loading, autoprefixing, etc.)

### Acknowledgements

Pieces of this app boilerplate are inspired by
[create-react-app](https://github.com/facebook/create-react-app). The config
folder is very similar, with `config/paths.js` and `config/polyfills.js` being
the same idea. Some differences is CRA is using
[webpack-dev-server](https://github.com/webpack/webpack-dev-server), which is in
maintenance mode, while we're using
[webpack-serve](https://github.com/webpack-contrib/webpack-serve), which is the
future of webpack serving.

Upgrades over CRA: Webpack 4, Babel 7.

### Babel

[Docs](https://babeljs.io/)
[Source](https://github.com/babel/babel)

Babel is a transpiler, we use several modules for it to target to specific browsers so that we can use ES2018 syntax in places where it's not fully supported. Babel is what lets us use things like async/await and object spread operators.

### ESLint

[Docs](https://eslint.org/)
[Source](https://github.com/eslint/eslint)

ESLint is a pluggable and configurable tool for identifying and reporting on patterns in JS. Used in combination with prettier, we can detect and fix many problems in code before they even are saved to disk.

We include [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off rules that conflict with running prettier.

### Husky

[Docs + Source](https://github.com/typicode/husky)

Husky sets up [githooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to tie into. Normally you would edit them yourself in the .git directory of a repository, however you can't commit those into the main repo. What you can do is have Husky set up several githooks for you, we use it for pre-commit.

### Jest

[Docs](https://jestjs.io/)
[Source](https://github.com/facebook/jest)

Easy to use JS test running platform. Faster than Ava at the moment.

A couple of dev-dependencies are related to Jest:

-   babel-core (bridge)
-   babel-jest

### Lint Staged

[Docs + Source](https://github.com/okonet/lint-staged)

Lint Staged ties in with Husky to run the linters before committing your code. It makes it so that no errors make it into the repository. Running the linter on the whole project would be slow, so we only lint the ones that are staged.

### Path

Path is used in our build process (see config/paths.js) to resolve paths on users systems or servers.

### Prettier

[Docs](https://prettier.io/)
[Source](https://github.com/prettier/prettier)

"Prettier is an opinionated code formatter." We change some of those opinions.

### Webpack

[Docs](https://webpack.js.org/)
[Source](https://github.com/webpack/webpack)

Webpack is used for the build process. Webpack can be extended to handle many different use cases, as well as configured to handle things like hashing the JS build name or running a development server with a watcher.

A few dev dependencies are for webpack:

-   babel-loader
-   webpack-cli
-   html-webpack-plugin

babel-loader is a loader for webpack that runs babel against file changes.

html-webpack-plugin makes it so we can edit the html doc to include the right hashed JS file after the build.

webpack-cli is just a cli interface for running webpack from the package.json. This could be replaced with a script in our scripts directory.

### Webpack Serve

[Docs + Source](https://github.com/webpack-contrib/webpack-serve)

Webpack-Serve was formerly [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Webpack Serve serves a webpack app in a modern way. Based on Koa, it uses native websockets, and because of this is limited to developing on browsers which support native websockets. Don't do your dev work on IE6 (but use Babel to bundle for it)!
