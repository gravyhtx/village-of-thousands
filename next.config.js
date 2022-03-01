module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/qr',
        destination: '/',
        permanent: true,
      },
    ]
  },
}