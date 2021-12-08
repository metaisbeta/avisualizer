import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ProjectProviderProps {
  children: ReactNode
}
interface ProjectContextProps {
  project: string
  changeProject: (project: string) => void
  file: any
  addFile: (file: any) => void
}

const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
)

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [project, setProject] = useState('Space Weather TSI')
  const [file, setFile] = useState('')

  async function changeProject(project: string) {
    setProject(project)
  }

  async function addFile(project: any) {
    setFile(project)
  }

  return (
    <ProjectContext.Provider value={{ project, changeProject, file, addFile }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  return useContext(ProjectContext)
}
