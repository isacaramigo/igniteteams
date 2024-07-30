module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [ //Mudda a foma de importas os arquivos
      [
      'module-resolver',
      {
        root: ['./src'], //Diz onde é a pasta raíz da nossa aplicação
        alias: { 
          '@assets': './src/assets', //quando chamarmos o '@assets' chamará a pasta ./src/assets
          '@components': './src/components',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
      ],
    ],
  };
};
