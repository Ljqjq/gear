// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Add any custom Metro configuration here if needed
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);