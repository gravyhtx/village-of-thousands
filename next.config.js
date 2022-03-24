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
        permanent: false,
      },
    ]
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/faq': { page: '/faq' },
    };
    return paths;
  }
}