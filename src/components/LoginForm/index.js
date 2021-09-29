import {useAuth0} from '@auth0/auth0-react'
import './index.css'

const LoginForm = () => {
  const {loginWithRedirect} = useAuth0()
  return (
    <div className="main-form-container">
      <div className="form-container">
        <h1 className="">Login Here</h1>
        <button
          className="button1"
          onClick={() => loginWithRedirect()}
          type="button"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginForm
