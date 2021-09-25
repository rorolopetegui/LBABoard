import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import HomePage from 'containers/HomePage'
import ControllersPage from 'containers/ControllersPage'
import NotFoundPage from 'containers/NotFoundPage/Loadable'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/Controllers" component={ControllersPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}
