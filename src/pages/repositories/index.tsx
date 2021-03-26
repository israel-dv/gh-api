import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Switch from 'src/components/Switch'
import { SearchContext } from 'src/utils/providers/searcher'
import { RepoProperties } from 'src/utils/interfaces/repoInterface'
import { Card } from 'src/components/Card'
import Total from 'src/components/Total'
import Spinner from 'src/components/Spinner'
import { URI } from 'src/api/client'
import { useLocalStorage } from 'src/utils/hooks/useLocalStorage'

const TOTAL = 'Total repositories found'

const RepositoriesPage: React.FC = () => {
  const { pathname } = useRouter()
  const { search } = React.useContext(SearchContext)

  const [repos, setRepos] = React.useState((): Array<RepoProperties> => [])
  const [totalRepos, setTotalRepos] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [storage] = useLocalStorage('searcher', '')

  React.useEffect(() => {
    setLoading(true)
    axios.get(`${URI}${pathname}?q=${search || storage}`).then((response) => {
      setLoading(false)
      setRepos(response.data.items)
      setTotalRepos(response.data?.['total_count'])
    })
  }, [search])

  return (
    <div className="container d-flex flex-column">
      <div className="container d-flex py-4 mx-3 justify-content-between">
        <Switch />
        <Total text={TOTAL} total={totalRepos} />
      </div>
      <div className="d-flex row row-cols-2 row-cols-lg-5 g-2 g-lg-3 align-item-center justify-content-center">
        {loading ? (
          <Spinner />
        ) : (
          repos.map((repositorie) => (
            <Card key={repositorie.full_name}>
              <div className="d-flex flex-column">
                <span className="card-title title">{repositorie.name}</span>
                <span className="card-subtitle mb-2 muted">
                  {repositorie.full_name}
                </span>
                <p className="card-text description">
                  {repositorie.description}
                </p>
                <span className="card-link text-light">{`Language: ${repositorie.language}`}</span>
                <a href={repositorie.html_url} className="url" target="_a">
                  {repositorie.html_url}
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default RepositoriesPage
