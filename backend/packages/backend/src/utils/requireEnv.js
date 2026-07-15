function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required env ${name} is not defined`);
  }
  return value;
}

function validateEnv(names = []) {
  const missing = names.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required env: ${missing.join(", ")}`);
  }
}

module.exports = {
  requireEnv,
  validateEnv,
};
