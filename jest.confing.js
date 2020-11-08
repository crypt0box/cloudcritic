module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': 'cloudcritic/$1',
    '^~/(.*)$': 'cloudcritic/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  'collectCoverage': true,
  'collectCoverageFrom': [
    'cloudcritic/components/**/*.vue',
    'cloudcritic/pages/**/*.vue'
  ]
}