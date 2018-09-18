# ESLint and Prettier

How can we go beyond writing tests to ensure code quality? Today we're going to go into this question and look at a few tools to not only help us along the way, but automate pieces of it. We're going to talk about a few things today, linting, formatting, and automating it. We will also setup our editor to handle it all live!

We will use a few tools to not only catch our poorly written and error full code and help us understand how to fix it. We'll use ESLint to detect errors and style violations in our code. We'll use Prettier and ESLint to automatically fix our things that are just style guidelines. We'll use git hooks to run it all before code is committed, so that no matter who puts code in the repo, it will be formatted properly.

Note: Although this is specifically Javascript based, the concepts here could apply to any interpreted language.

### Getting Setup

The first thing we want to do is setup our project to have some code to lint and format. Let's make a javascript file in a source directory

```
mkdir src && touch src/index.js
```

Open your new file, `index.js` and write some code:

```javascript
const neverGonnaGiveYou = 'up';
let neverGonnaLetYou = 'down';

const neverGonnaRunAround = () => {
    return 'and desert you';
};

function sing() {
    return `
    Never gonna give you ${neverGonnaGiveYou},
    Never gonna let you ${neverGonnaLetYou},
    Never gonna run around ${neverGonnaRunAround()}
    `;
}

if (neverGonnaGiveYou != neverGonnaLetYou) {
    console.log(sing());
}
```

Try it out:

```
node src/index.js
```

### Linting

A good linter is about a lot more than just keeping to a code style guide.

Linting is especially helpful in interpreted languages. Since you lack the compilation step of a language like Go or C, errors can more easily make it through to runtime. The earlier in your coding process that you catch errors, the faster they are to fix. Linting helps you catch errors at write-time.

The linter will analyze our source files and flag any errors in the code, style violations or things that just look plain weird. Catching these things early can significantly speed up development, how often have you searched for an extra or missing curly brace?

Let's start by installing ESLint:

```
npm install --save-dev eslint
```

Let's add a little script to our `package.json` file:

```json
{
    ...
    "scripts": {
        ...
        "lint": "eslint src/",
        ...
    }
    ...
}
```

We're telling eslint to run against the `src/` directory here. Later, we'll set up more specific matching parameters, but for now this will be enough.

Run eslint:

```
npm run lint
```

And you should get something that looks like:

```
1:1  error  Parsing error: The keyword 'const' is reserved

✖ 1 problem (1 error, 0 warnings)

npm ERR! code ELIFECYCLE
npm ERR! errno 1
...
...
...
```

ESLint defaults to using ES5 rules, so we want to specify our own rules so that we can use ES6 and even beyond syntax. We can do this by configuring eslint. There's a few options for configuration, a `.eslintrc` file, a `.eslintrc.*` (yaml, js or json), or a field in package.json called `eslintConfig`.

Since ESLint isn't the only thing I end up having to configure for most projects, I like to put all my configs into a `config` folder at the root. This means I need to specify the path to this file in `package.json`.

Now let's make our configuration file:

```
mkdir config && touch config/eslint.config.js
```

And tell eslint where to find our configuration file, open `package.json` and add an eslintConfig key:

```json
{
    ...
    "eslintConfig": {
        "extends": [
            "./config/eslint.config.js"
        ]
    }
    ...
}
```

Let's open our configuration file, `config/eslint.config.js`, and say which version of [ECMAScript](https://www.ecma-international.org/memento/tc39.htm) we want to test our files against. I'll use ES2018.

```javascript
module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
    },
};
```

If we run our linter again, now we shouldn't get any errors.

We haven't really added any rules though, so why should we expect any errors. Let's pick a few to add against our code. Taking a look at the whole list here:
[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/).

Let's pick three that stand out: eqeqeq, prefer-const and semi. The first, eqeqeq, disallows the use of `==` and `!=` in favor of the more specific `===` and `!==`. It can help with catching type errors faster. The second, prefer-const, will prefer const in every situation where we're not reassigning variables after their declaration. The third, semi, requires semicolons at the end of each statement.

We can add rules to a rules key in the eslint config file, each rule will be keyed on it's name. Let's add eqeqeq, prefer-const and semi to our config, `config/eslint.config.js`.

```javascript
module.exports = {
    ...
    rules: {
        eqeqeq: 'error',
        'prefer-const': 'error',
        semi: 'error'
    }
    ...
}
```

If we run our lint command again, `npm run lint`, we should see an error:

```
2:5   error  'neverGonnaLetYou' is never reassigned. Use 'const' instead  prefer-const
13:6  error  Missing semicolon  semi
16:23  error  Expected '!==' and instead saw '!='  eqeqeq
```

We can read this as: `<line number>:<column number> <severity> <message> <rule>`. So we know two things from this error message:

Line 2, column 5 has an error that neverGonnaLetYou is never reassigned and it's from the rule 'prefer-const'. Fix it by changing line 2 from `let` to `const`.

Line 13, column 6 has an error of a missing semicolon. Fix it by adding a semicolon just after the backtick.

Line 16, column 23 has an error where it expected to see '!==' and instead saw '!=' and this is from the eqeqeq rule. Let's fix it by examining line 16:

```javascript
if (neverGonnaGiveYou != neverGonnaLetYou) {
```

Changing it to:

```javascript
if (neverGonnaGiveYou !== neverGonnaLetYou) {
```

Running our lint script, `npm run lint`, again now produces no errors.

There are a lot of great options here for configuration and it's worth familiarizing yourself with the rules. You can extend eslint with a preset, some great options are:

-   [ESLint Reccomended](https://eslint.org/docs/rules/)
-   [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
-   [Google](https://github.com/google/eslint-config-google)

### Formatting

We're going to use Prettier for code formatting. It's opinionated, slightly configurable, handles line width, ESLint does not, and handles files other than JS.

```
npm install --save-dev prettier
```

Prettier command line accepts file matching, so let's configure that in our `package.json`. We're just going to lint our one file for now.

```json
{
    ...
    "scripts": {
        ...
        "format": "prettier src/index.js"
        ...
    }
    ...
}
```

So let's run it and see what happens:

```
npm run format
```

```
const neverGonnaGiveYou = "up";
const neverGonnaLetYou = "down";

const neverGonnaRunAround = () => {
  return "and desert you";
};

function sing() {
  return `
    Never gonna give you ${neverGonnaGiveYou},
    Never gonna let you ${neverGonnaLetYou},
    Never gonna run around ${neverGonnaRunAround()}
    `;
}

if (neverGonnaGiveYou !== neverGonnaLetYou) {
  console.log(sing());
}
```

At first glance, it looks like just our file, but notice a few things, single quotes have been replaced by double quotes for example. This is just one of the things that prettier can do, it can auto format long lines or destructurings or many parameters. And it can do it all automatically. What it printed out there is a suggestion of what the file should be, but it hasn't actually changed the file and saved it. Let's make it fix the file.

Let's add an option to autofix our `package.json`:

```json
{
    "format": "prettier --write src/index.js"
}
```

Now if we run `npm run format` again, the file will have changed to include all of prettiers opinions. We're only really seeing the doublequotes replace singlequotes, but there's a ton of other [options](https://prettier.io/docs/en/options.html) that Prettier can do too.

Let's give it a couple of options in our `package.json`:

```json
{
    ...
    "prettier": {
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 4
    }
    ...
}
```

and run `npm run prettier` again to see it come back to use our new settings.

### Setup Your Editor

I'm currently using [Visual Studio Code](https://code.visualstudio.com/), but the same principles apply to all editors, there will just be a few things different.

Let's install two plugins for our editor, Prettier and ESLint:

**VSCode**

-   [Prettier](https://github.com/prettier/prettier-vscode)
-   [ESLint](https://github.com/Microsoft/vscode-eslint)

**Atom**

-   [Prettier](https://github.com/prettier/prettier-atom)
-   [ESLint](https://github.com/AtomLinter/linter-eslint)

**Sublime**

-   [Prettier](https://packagecontrol.io/packages/JsPrettier)
-   [ESLint](https://github.com/SublimeLinter/SublimeLinter-eslint)

After you've installed your editor's plugins and reloaded your editor, look at your `src/index.js` file again, remove a semicolon. It should have put a little red squiggle, or some other marker where you're now missing a semicolon. If you hover your mouse over it you should see the warning resembling the earlier messages by running it from the command line. You should see both prettier and eslint throwing the error. Save the file.

Enable your editor's format on save option. Now go back to your src file and hit space to mark the file as dirty and then save. Your editor should fix it, but it might do some weird stuff. It won't always, but there are plenty of possible errors. Also, eslint and prettier may fight over certain configuration options, we don't want that.

Let's remove conflicting rules between eslint and prettier. We can do this with a package that turns off eslint's conflicting rules. Install it with:

```
npm install --save-dev eslint-config-prettier
```

Now open up your eslint config again, `config/eslint.config.js`, and include at the top in your module.exports:

```js
module.exports = {
    "extends": ["prettier"],
    ...
}
```

Now, anything prettier can't handle that eslint can, will be handled by eslint and anything that prettier can handle, eslint will ignore. The overlap between the two formatters is gone!

### Automate

While I am a fan of having an enforced code style throughout your project among all contributors, I am not a fan of forcing people to configure their editor a certain way. We can get around this by letting people write whatever they want as long as it's not a bug and then force the formatting not on the people, but on the code.

Since we don't care what the code is on each person's machine, but we do care what's in the repo, we only want to enforce these formattings just before the person commits the code to the repository.

[Githooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are a way to fire off custom scripts when an event happens. We want an event called `precommit`. Unfortunately, Githooks don't travel with repositories, so we'd have to have each individual person set up their own. That's a nightmare and avoids what we're trying to do: automate it!

Enter [Husky](https://github.com/typicode/husky). Husky sets up githooks on installation and looks at your `package.json` file for equivalent scripts. We're interested in the `precommit` hook to run our stylists against.

We have to be careful however, in a large project, we don't want to lint and style every single file on every commit for a couple of reasons. We don't want to lint everything because not everything has been modified and because that would potentially take a while.

We'll use a different tool: [lint-staged](https://github.com/okonet/lint-staged). Lint Staged runs linters against files that git reports.

Let's install both Husky and lint-staged:

```
npm install --save-dev husky lint-staged
```

And create the configuration file:

```
touch config/lint-staged.config.js
```

Configuring in our `package.json` is done with a key in the scripts tag:

```json
{
    ...
    "scripts": {
        ...
        "precommit": "lint-staged --config config/lint-staged.config.js"
        ...
    }
    ...
}
```

All that's left is to configure your hook. Open up your lint-staged config, `config/lint-staged.config.js`. We're only going to care about a linters key. There are other options for turning off concurrency or modifying the chunk size, but I think the defaults are enough for most projects. The linters is an object with globs as keys.

```javascript
module.exports = {
    linters: {
        '**/*.js': ['eslint --config config/eslint.config.js --fix', 'git add'],
        '**/*.+(js|json|css|md)': ['prettier --write', 'git add'],
    },
};
```

Our fist key, '\*_/_.js', only matches javascript files that are being committed. Since eslint won't work on css/json/css/md files, we only want to run it against JS files. The second key is much broader and lets prettier do it's magic. Prettier can run against js, json, css and markdown in addition. You can also add some extras if you like, sass, less, yaml, etc. Configure these glob matchings to your heart content! Each of these is followed up by a git add if modification happened and it was successfully fixed.

Each set of commands will be run in order, and run specifying a file, so while the key looks like `git add`, it runs against specific files and will look like `git add file.js` in the end.

Now every time anyone working on the project commits, staged files will be formatted according to your specifications!

### TL;DR

-   ESLint to lint your javascript
-   Prettier to format your files
-   Husky to setup Githooks
-   lint-staged to run scripts against git-reported files
-   Editor plugins for the lazy
