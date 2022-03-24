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
      '/activate/:path*': { page: '/activate/:path*' },
      '/404': { page: '/404' },
    };
    return paths;
  }
}