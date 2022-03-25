const { createServer } = require('http')
const next = require('next')
 
const isDevMode = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? process.env.PORT : 3000
 
const nextjsApp = next({ dev: isDevMode })
const nextjsRequestHandler = nextjsApp.getRequestHandler()
 
nextjsApp
  .prepare()
  .then(() => {
    createServer((req, res) => {
      // The request url likely will not include a protocol or host, therefore
      // resolve the request url against a dummy base url.
      const url = new URL(req.url, "http://w.w")
      nextjsRequestHandler(req, res, url)
    }).listen(port, (err) => {
      if (err) throw err
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })