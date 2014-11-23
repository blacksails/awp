express = require 'express'
app = express()
http = require('http').Server(app)
sassMiddleware = require 'node-sass-middleware'
publicdir = "#{__dirname}/public"
io = require('socket.io')(http)
moment = require 'moment'

app.use sassMiddleware {
  src: "#{__dirname}/sass",
  dest: publicdir
}
app.use express.static(publicdir)

io.on 'connection', (socket) ->
  socket.on 'chat message', (msg) ->
    m = {
      time: moment().format("HH:mm")
      nick: msg.nick || "Anonymous"
      msg: msg.msg
    }
    io.emit 'new message', m

http.listen 8010, () ->
  console.log 'listening on *:8010'
