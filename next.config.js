module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  async redirects() {
    return [
      {
        source: '/qr',
        destination: '/',
        permanent: true,
      },
    ]
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' }
    };
    return paths;
  }
}