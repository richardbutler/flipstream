express   = require 'express'
app       = express.createServer()

app.configure ->
  app.use express.methodOverride()
  app.use express.bodyParser()
  app.use express.static( "#{ __dirname }/assets" )
  app.use app.router
  return

app.get '/', ( req, res ) ->
  res.sendfile "#{ __dirname }/index.html"
  return

app.listen 3000

console.log 'Listening on localhost:3000'
