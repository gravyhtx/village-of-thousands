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
      '/shop': { page: '/shop' },
      '/cart': { page: '/cart' },
      '/activate': { page: '/activate' },
      '/activate/:slug*': { page: '/activate/:slug' },
      '/404': { page: '/404' },
    };
    return paths;
  }
}