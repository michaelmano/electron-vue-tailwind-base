module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
      },
    },
    chainWebpack: config => {
      const svgRule = config.module.rule('svg');
  
      svgRule.uses.clear();
  
      svgRule
        .use('vue-loader')
        .loader('vue-loader-v16') // or `vue-loader` if you are not using the preview support of Vue 3 in Vue CLI
        .end()
        .use('vue-svg-loader')
        .loader('vue-svg-loader');
  
      config.entry('electron-preload').add('./src/preload.js').end();
    },
  }
  