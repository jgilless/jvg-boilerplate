const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
//Expand and get environment variables from the .env file and the actual env
dotenvExpand(dotenv.config());

const whiteListEnvKeys = ["NODE_ENV", "API_ENDPOINT"];

/**
 * Takes a set of environment vars and stringifies it to pass
 * to the webpack define plugin
 * @param { Object } objEnv raw env vars
 * @return { Object } stringified K/V of env vars
 */
function getEnv() {
  return Object.keys(process.env).reduce((env, key) => {
    if (whiteListEnvKeys.indexOf(key) > -1) {
      env[key] = JSON.stringify(process.env[key]);
    }
    return env;
  }, {});
}

module.exports = getEnv;
