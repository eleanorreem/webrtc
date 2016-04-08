require('env2')('./config.env')

import Hapi from 'hapi'
const server = new Hapi.Server()
const port = process.env.PORT || 4000

// helper methods
import {handlePlugins} from './helpers/server-helpers.js'

// server plugins
import Inert from 'inert'
import Bell from 'bell'
import AuthCookie from 'hapi-auth-cookie'

// server routes
import reactUrls from './routes/ReactUrls.js'
import images from './routes/Images.js'
import scripts from './routes/Scripts.js'
import twitterLogin from './routes/TwitterLogin.js'
import notes from './routes/api/note/index.js'
import profile from './routes/api/profile/index.js'

// auth strategies
import {TwitterCookie, TwitterOauth} from './authStrategies/twitterAuthStrategies.js'

const ConnectionSettings = {port, routes: {cors: true}}
const Plugins = [Inert, Bell, AuthCookie]

server.connection(ConnectionSettings)
server.register(Plugins, handlePlugins)
server.auth.strategy('twitter', 'bell', TwitterOauth)
server.auth.strategy('session', 'cookie', TwitterCookie)

export default (client) => {
  const Routes = [
    reactUrls,
    images,
    scripts,
    twitterLogin,
    notes(client),
    profile(client)
  ]
  server.route(Routes)
  return server
}
