import React from 'react'
import router from 'next/router'

import { SearchContext } from 'src/utils/providers/searcher'
import { URI } from 'src/api/client'
import { TITLE } from 'src/pages/_app'

const BUTTON_PLACEHOLDER = 'Search'

const Navbar: React.FC = () => {
  const { typeToSearch, setUrl } = React.useContext(SearchContext)
  const [searcher, setSearcher] = React.useState('')

  React.useEffect(() => {
    if (searcher) {
      setUrl(`${URI}/${typeToSearch}?q=${searcher}`)
    }
  }, [typeToSearch])

  const handleChange = (event) => {
    setSearcher(event.target.value)
  }

  const requestData = () => {
    if (searcher !== '') {
      setUrl(`${URI}/${typeToSearch}?q=${searcher}`)
      router.push(`/${typeToSearch}`)
    }
  }

  const keyPressed = (event) => {
    if (event.which === 13) {
      if (searcher !== '') {
        setUrl(`${URI}/${typeToSearch}?q=${searcher}`)
        router.push(`/${typeToSearch}`)
      }
    }
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-dark justify-content-between">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          {TITLE}
        </a>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={requestData}
            disabled={searcher === ''}
          >
            {BUTTON_PLACEHOLDER}
          </button>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder={BUTTON_PLACEHOLDER}
            onChange={handleChange}
            onKeyPress={keyPressed}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
