$ () -> 
  socket = io()
  $m = $ '#m'
  $nick = $ '#nick'
  $messages = $ '#messages'
  $('form').submit (event) ->
    event.preventDefault()
    msg = {
      nick: $nick.val()
      msg: $m.val()
    }
    socket.emit 'chat message', msg
    $m.val ''
    false
  socket.on 'new message', (msg) ->
    m = "#{msg.time} - #{msg.nick}: #{msg.msg}"
    $messages.append $('<li>').text(m)

