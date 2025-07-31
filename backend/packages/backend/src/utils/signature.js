const { u8aToHex, stringToU8a, hexToU8a } = require("@polkadot/util");
const {
  mnemonicToMiniSecret,
  sr25519Sign,
  sr25519PairFromSeed,
  cryptoWaitReady,
  encodeAddress,
} = require("@polkadot/util-crypto");
const { chainsDef } = require("../constants/chainsDef");

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"), // Adjust based on actual path
});

const MNEMONIC = process.env.ADMIN_ADDRESS_MNEMONIC;
const PRIVATE_KEY = process.env.ADMIN_ADDRESS_PRIVATE_KEY;

/**
 * Generate sr25519 key pair from private key
 * @param {string|Uint8Array} privateKey - Private key (hex string or Uint8Array)
 * @returns {Promise<object>} Key pair
 */
async function generateKeyPairFromPrivateKey(privateKey = PRIVATE_KEY) {
  await cryptoWaitReady();

  let privateKeyBytes;
  if (typeof privateKey === "string") {
    // Remove 0x prefix if exists
    const cleanKey = privateKey.startsWith("0x")
      ? privateKey.slice(2)
      : privateKey;
    privateKeyBytes = hexToU8a(cleanKey);
  } else if (privateKey instanceof Uint8Array) {
    privateKeyBytes = privateKey;
  } else {
    throw new Error("Private key must be string or Uint8Array");
  }

  // Ensure private key length is correct (64 bytes)
  if (privateKeyBytes.length !== 64) {
    throw new Error(
      "Private key must be 64 bytes (32 bytes for seed + 32 bytes for chain code)",
    );
  }

  // Use first 32 bytes as seed
  const seed = privateKeyBytes.slice(0, 32);
  return sr25519PairFromSeed(seed);
}

/**
 * Generate key pair from mnemonic
 * @param {string} mnemonic - Mnemonic phrase
 * @returns {Promise<object>} Key pair
 */
async function generateKeyPairFromMnemonic(mnemonic = MNEMONIC) {
  await cryptoWaitReady();
  const seed = mnemonicToMiniSecret(mnemonic);
  const keypair = sr25519PairFromSeed(seed);
  return keypair;
}

/**
 * Automatically detect key type and generate key pair
 * Prioritize private key, if no private key then use mnemonic, if neither exists return null
 * @param {string} keyMaterial - Mnemonic or private key
 * @returns {Promise<object|null>} Key pair or null
 */
async function generateKeyPair() {
  if (MNEMONIC) {
    return await generateKeyPairFromMnemonic(MNEMONIC);
  } else if (PRIVATE_KEY) {
    return await generateKeyPairFromPrivateKey(PRIVATE_KEY);
  }
  return null;
}

/**
 * Sign message
 * @param {string|Uint8Array} message - Message to sign
 * @param {object} keypair - Key pair
 * @returns {Promise<string>} Signature result (hex)
 */
async function signMessage(message, keypair) {
  await cryptoWaitReady();

  let messageBytes;

  if (typeof message === "string") {
    // If it's a string, convert to Uint8Array first
    messageBytes = stringToU8a(message);
  } else if (message instanceof Uint8Array) {
    messageBytes = message;
  } else {
    throw new Error("Message must be string or Uint8Array");
  }

  const signature = sr25519Sign(messageBytes, keypair);
  return u8aToHex(signature);
}

/**
 * Get address
 * @param {object} keypair - Key pair
 * @param {number} ss58Format - SS58 format, 0 for Polkadot, 2 for Kusama
 * @returns {string} Address
 */
function getAddress(keypair, ss58Format = 0) {
  return encodeAddress(keypair.publicKey, ss58Format);
}

/**
 * Helper signing function - supports Polkadot/Kusama
 * @param {string|Uint8Array} message - Message to sign
 * @param {string} network - Network type ('polkadot' or 'kusama')
 * @param {string} mnemonicOrPrivateKey - Mnemonic or private key, optional, defaults to mnemonic constant
 * @returns {Promise<object>} Object containing signature result and address
 */
async function signWithPolkadot(message, network = "polkadot") {
  // Wait for crypto library initialization
  await cryptoWaitReady();

  // Validate network parameter
  if (!["polkadot", "kusama"].includes(network.toLowerCase())) {
    throw new Error('Network must be "polkadot" or "kusama"');
  }

  const ss58Format = chainsDef[network].ss58Format;

  try {
    const keypair = await generateKeyPair();
    const signature = await signMessage(message, keypair);
    const address = getAddress(keypair, ss58Format);

    return {
      signature,
      address,
      network: network.toLowerCase(),
      publicKey: u8aToHex(keypair.publicKey),
    };
  } catch (error) {
    throw new Error(`Signing failed: ${error.message}`);
  }
}

/**
 * verify signature
 * @param {string|Uint8Array} message
 * @param {string} signature
 * @param {string} address
 * @returns {Promise<boolean>} result
 */
async function verifySignature(message, signature, address) {
  await cryptoWaitReady();

  const { signatureVerify } = require("@polkadot/util-crypto");

  let messageBytes;
  if (typeof message === "string") {
    messageBytes = stringToU8a(message);
  } else if (message instanceof Uint8Array) {
    messageBytes = message;
  } else {
    throw new Error("Message must be string or Uint8Array");
  }

  try {
    const result = signatureVerify(messageBytes, signature, address);
    return result.isValid;
  } catch (error) {
    return false;
  }
}

module.exports = {
  signMessage,
  getAddress,
  signWithPolkadot,
  verifySignature,
};
