module.exports = {
  presets: [
    [require.resolve('@babel/preset-env'), {
      useBuiltIns: 'entry',
      corejs: 3,
      targets: {
        esmodules: true,
      },
    }],
    require.resolve('@babel/preset-react'),
  ],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    require.resolve('babel-plugin-macros'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties'),
  ],
  env: {
    production: {
      plugins: [
        require.resolve('@babel/plugin-transform-react-constant-elements'),
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
      ],
    },
  },
};
