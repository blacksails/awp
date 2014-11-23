# Simplechat

This is a simple chat application. The client and the server are written in 
CoffeeScript, and the styling is written in sass.

## Usage
Run the application with
```
coffee index.coffee
```
If you prefer using node directly then
```
coffee -c index.coffee
node index.js
```

## Styling
I did an experiment with the express library's middleware so that it compiles
sass to css on every page request. In production this should ofcause be 
precompiled

## TODO
- Make a grunt task which compiles coffeescript and sass
