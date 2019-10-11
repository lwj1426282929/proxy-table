module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/generate': {
        // target: 'http://172.18.201.196:8081/',
        target: 'http://10.1.190.224:8081/',
        changeOrigin: true,
      },
      '/server': {
        // target: 'http://172.18.201.196:8081/',
        target: 'http://10.1.190.224:8081/',
        changeOrigin: true,
      }
    },
  },
};
