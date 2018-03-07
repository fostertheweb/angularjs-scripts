module.exports = {
  extends: require.resolve('stylelint-config-sass-guidelines'),
  rules: {
    'max-nesting-depth': 5,
    'order/properties-alphabetical-order': [null, {
      disableFix: true
    }],
    'selector-class-pattern': null,
    'selector-max-compound-selectors': 10,
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute', 'class']
    }]
  }
};
