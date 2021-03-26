import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { Card } from 'src/components/Card'
import Switch from 'src/components/Switch'
import Total from 'src/components/Total'
import { UsersProperties } from 'src/utils/interfaces/userInterface'
import { SearchContext } from 'src/utils/providers/searcher'
import Spinner from 'src/components/Spinner'
import { useLocalStorage } from 'src/utils/hooks/useLocalStorage'
import { URI } from 'src/api/client'

const TEXT_TOTAL = 'Total users found'

const UsersPage: React.FC = () => {
  const { pathname } = useRouter()
  const { search } = React.useContext(SearchContext)

  const [users, setUsers] = React.useState((): Array<UsersProperties> => [])
  const [total, setTotal] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [searchStorage] = useLocalStorage('searcher', '')

  React.useEffect(() => {
    setLoading(true)
    // TODO this function can be optimized or reduce
    axios
      .get(`${URI}${pathname}?q=${search || searchStorage}`)
      .then((response) => {
        setLoading(false)
        setUsers(response.data?.items)
        setTotal(response.data?.['total_count'])
      })
  }, [search])

  return (
    <div className="container d-flex flex-column">
      <div className="container d-flex py-4 mx-3 justify-content-between">
        <Switch />
        <Total text={TEXT_TOTAL} total={total} />
      </div>
      <div className="d-flex row row-cols-2 row-cols-lg-5 g-2 g-lg-3 align-item-center justify-content-center">
        {loading ? (
          <Spinner />
        ) : (
          users.map((user) => (
            <Card key={user.login}>
              <div className="d-flex align-items-center">
                <img className="avatar" src={user.avatar_url}></img>
                <div className="d-flex flex-column mx-2">
                  <span className="card-title title">{user.login}</span>
                  <span className="mb-2 text-muted">
                    Score: <span className="muted">{`${user.score}`}</span>
                  </span>
                  <span className="card-text description">{`type: ${user.type}`}</span>
                  <a
                    className="text-truncate url"
                    href={user.html_url}
                    target="_a"
                  >
                    {user.html_url}
                  </a>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default UsersPage
