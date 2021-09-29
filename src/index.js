import React from 'react'
import ReactDOM from 'react-dom'

import {Auth0Provider} from '@auth0/auth0-react'
import App from './App'

const domain = 'dev-hx5gazx0.us.auth0.com'
const clientId = 'D7jKBO2z5SPzj6fdocZvMwri7MWRe56f'

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
)
