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
      },{
        source: '/checkout/details',
        destination: '/',
        permanent: false,
      },
    ]
  }
}