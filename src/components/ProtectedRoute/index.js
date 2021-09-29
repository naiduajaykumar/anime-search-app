import {Redirect, Route} from 'react-router-dom'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import Cookie from 'js-cookie'

const ProtectedRoute = ({component, ...props}) => (
  <Route component={withAuthenticationRequired(component)} {...props} />
)

export default ProtectedRoute
