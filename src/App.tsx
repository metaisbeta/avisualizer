import React from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { Layout } from './components/Layout'
import { Error } from './pages/Error'
import { Home } from './pages/Home'
import { Loading } from './pages/Loading'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/error">
          <Error />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
