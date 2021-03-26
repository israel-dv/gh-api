import React from 'react'
import axios from 'axios'

import { RepoProperties } from 'src/utils/interfaces/repoInterface'
import { Card } from 'src/components/Card'
import Spinner from 'src/components/Spinner'

const GET_ALL_REPOS_URL = 'https://api.github.com/repositories'

export default function Home(): React.ReactElement {
  const [lastRepos, setlastRepos] = React.useState(
    (): Array<RepoProperties> => []
  )
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    axios.get(GET_ALL_REPOS_URL).then((response) => {
      setLoading(false)
      setlastRepos(response.data)
    })
  }, [])

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="text-light mb-5">GitHub-API project NextJS</h1>
      <div className="d-flex row row-cols-2 row-cols-lg-5 g-2 g-lg-3 align-item-center justify-content-center">
        {loading ? (
          <Spinner />
        ) : (
          lastRepos.map((repo) => (
            <Card key={repo.full_name}>
              <div className="d-flex flex-column">
                <span className="muted">{repo.name}</span>
                <span className="title">{repo.full_name}</span>
                <p className="description text-truncate">{repo.description}</p>
                <a href={repo.html_url} target="_a" className="url">
                  {repo.html_url}
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
