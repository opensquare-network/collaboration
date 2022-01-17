const Environment = require("jest-environment-node");

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
  }
};
