import {BrowserRouter, Route, Switch} from 'react-router-dom'

import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AnimeItemDetails from './components/AnimeItemDetails'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/anime/:id" component={AnimeItemDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
