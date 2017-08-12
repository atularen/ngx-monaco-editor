'use strict';

module.exports = {
  paths: {
    packagejson: [
      'src/**/**/package.json'
    ],
    deployed: 'deploy/platform/',
    styles: [
      '!src/theme.scss',
      '!src/styles.scss',
      'src/**/**.scss',
      '!src/app/**/**.scss',
      'src/**/**.css',
      '!src/app/**/**.css'
    ],
    requiredfiles: [
      'src/**/**.html',
      'src/**/**.js',
      'src/**/**.ts',
      'src/**/**/package.json',
      'src/**/tsconfig-aot.json',
      '!src/app/**/**.html',
      '!src/app/**/**.js',
      '!src/app/**/**.ts',
      '!src/environments/**/**.ts',
      '!src/polyfills.ts',
      '!src/main.ts',
      'src/typings.d.ts',
      '!src/index.html'
    ]
  }
};
