module.exports = {
  appDir: 'www',
  baseUrl: 'js/',
  mainConfigFile: 'www/js/common.js',
  dir: 'www-release',
  modules: [
    // First set up the common build layer.
    {
      // module names are relative to baseUrl
      name: 'common',
      // List common dependencies here. Only need to list
      // top level dependencies, 'include' will find
      // nested dependencies.
      include: [
        'app/models/basicModel',
        'bootstrap'
      ],
      // Since we bundle jquery with require.js we don't need
      // to additionally compile it into this layer. It will
      // already be available on the page as part of the 
      // script tag that pulls in require.js
      exclude: ['jquery']
    },

    // Now set up a build layer for each main layer, but exclude
    // the common one. If you're excluding a module, the excludee
    // must appear before the excluder in this file. Otherwise it will
    // get confused.
    {
      name: 'app/main-about',
      exclude: ['common', 'jquery']
    },

    {
      name: 'app/main-contact',
      exclude: ['common', 'jquery']
    }
  ]
};