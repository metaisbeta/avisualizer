import React from 'react'

import { Layout } from './components/Layout'
import { ProjectProvider } from './hooks/useProject'
import { Home } from './pages/Home'

function App() {
  return (
    <ProjectProvider>
      <Layout>
        <Home />
      </Layout>
    </ProjectProvider>
  )
}

export default App
