const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://ecommerce-six-ashen-58.vercel.app/'
  }
})
