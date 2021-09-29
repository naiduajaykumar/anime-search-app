import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import './index.css'

const LogoutButton = () => {
  const {logout} = useAuth0()
  return (
    <div>
      <button onClick={() => logout()} type="button" className="button1">
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
