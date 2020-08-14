import gql from './gql'
import fetch from './fetch'
import Auth from './Auth'
import Blog from './Blog'
import Other from './Other'

let _sdk: ISDK;

export default function SDK(options: IOptions): ISDK {
  if (_sdk) return _sdk

  const $config = {
    ...options,
    authenticated: false
  }

  const $app: IApp = {
    $config,
    $fetch: fetch($config),
    gql
  }

  const auth = new Auth($app)
  const blog = new Blog($app)
  const other = new Other($app)

  auth.on('onUser', (user) => {
    $config.authenticated = !!user
  })

  _sdk = {
    auth,
    blog,
    other,
  }

  return _sdk
}