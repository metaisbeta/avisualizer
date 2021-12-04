import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ProjectProviderProps {
  children: ReactNode
}

interface ProjectContextProps {
  project: string
  changeProject: (project: string) => void
}

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
)

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [project, setProject] = useState('Space Weather TSI')

  async function changeProject(project: string) {
    setProject(project)
  }

  return (
    <ProjectContext.Provider value={{ project, changeProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  return useContext(ProjectContext)
}
