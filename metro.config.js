const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add path aliases
config.resolver.alias = {
  '@': './src',
  '@/components': './src/shared/components',
  '@/features': './src/features',
  '@/shared': './src/shared',
  '@/store': './src/store',
  '@/services': './src/services',
  '@/styles': './src/styles',
  '@/utils': './src/shared/utils',
  '@/types': './src/shared/types',
  '@/constants': './src/shared/constants',
  '@/hooks': './src/shared/hooks',
};

module.exports = config; 