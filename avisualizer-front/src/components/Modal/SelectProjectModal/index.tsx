import React, { useEffect } from 'react'

import { MagnifyingGlass } from 'phosphor-react'

import { useProject } from '../../../hooks/useProject'
import { apiGithub, apiAsniffer } from '../../../services/api'
import { Select } from '../../Select'
import { TabMenu } from '../../TabMenu'
import { TabItem } from '../../TabMenu/TabItem'
import {
  Container,
  Content,
  SelectRepoContainer,
  ReposContainer,
  ActionContainer,
  SelectProjectContainer
} from './styles'
import { SelectProjectModalProps } from './types'

interface selectedRepoProps {
  html_url: string
  name: string
}

export const SelectProjectModal: React.FC<SelectProjectModalProps> = ({
  onClose
}) => {
  const [selectedRepo, setSelectedRepo] = React.useState<selectedRepoProps>({
    html_url: '',
    name: ''
  })
  const [response, setResponse] = React.useState<any[]>([])
  const [user, setUser] = React.useState('')
  const { addFile, changeProject } = useProject()

  async function getResponse() {
    const res = await apiGithub.get(`${user}/repos`)
    setResponse(res.data)
  }
  async function getJson() {
    const config = {
      params: {
        projectRepoURL: selectedRepo.html_url
      }
    }
    const res = await apiAsniffer.get('avisualizer-report', config)
    addFile(res.data)
    changeProject(selectedRepo.name)
    onClose()
  }
  return (
    <Container>
      <Content>
        <SelectRepoContainer>
          <div className="public-repo">
            <h3>Public Repository</h3>
            <div className="search">
              <input
                type="text"
                placeholder="Github User"
                onChange={(event) => setUser(event.target.value)}
              />
              <button onClick={getResponse}>
                <MagnifyingGlass weight={'bold'} size={18} />
              </button>
            </div>
          </div>
        </SelectRepoContainer>
        <ReposContainer>
          {response.length ? (
            <table>
              <thead>
                <tr>
                  <th>Repository</th>
                </tr>
              </thead>
              <tbody>
                <div style={{ overflow: 'auto', maxHeight: '250px' }}>
                  {response?.map((repo) => (
                    <tr
                      style={{
                        background:
                          selectedRepo.html_url === repo.html_url
                            ? 'rgba(4, 104, 191, 0.05)'
                            : 'white'
                      }}
                      onClick={() => {
                        setSelectedRepo(repo)
                      }}
                      key={repo.id}
                    >
                      <td
                        style={{
                          borderBottom: '1px solid #C4C4C4 '
                        }}
                      >
                        <p>
                          <b>{repo.name}</b>
                        </p>
                        <p>{repo.description}</p>
                      </td>
                    </tr>
                  ))}
                </div>
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </ReposContainer>
        <ActionContainer>
          <button id="btn-open" onClick={getJson}>
            Open
          </button>
          <button id="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </ActionContainer>
      </Content>
    </Container>
  )
}
