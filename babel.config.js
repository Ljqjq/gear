module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'react' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
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
          },
        },
      ],
    ],
  };
}; 