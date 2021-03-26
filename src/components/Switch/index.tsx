import React from 'react'
import { useRouter } from 'next/router'

import { SearchContext } from '../../utils/providers/searcher'
import { useLocalStorage } from 'src/utils/hooks/useLocalStorage'

const SWITCH_OPTIONS = {
  firstOption: {
    title: 'Repositories',
    value: 'repositories',
  },
  secondOption: {
    title: 'Users',
    value: 'users',
  },
}

const Switch: React.FC = () => {
  const { push: pushToPage } = useRouter()
  const { typeToSearch, setTypeToSearch } = React.useContext(SearchContext)
  const [, setStorage] = useLocalStorage('path', '')

  const handleChange = (event) => {
    const { value } = event.target
    console.log(value)
    setTypeToSearch(value)
    pushToPage(value)
    setStorage(value)
  }

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio1"
        autoComplete="off"
        onChange={handleChange}
        value={SWITCH_OPTIONS.firstOption.value}
        checked={typeToSearch === SWITCH_OPTIONS.firstOption.value}
      />
      <label className="btn btn-outline-light" htmlFor="btnradio1">
        {SWITCH_OPTIONS.firstOption.title}
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="btnradio2"
        autoComplete="off"
        value={SWITCH_OPTIONS.secondOption.value}
        onChange={handleChange}
        checked={typeToSearch === SWITCH_OPTIONS.secondOption.value}
      />
      <label className="btn btn-outline-light" htmlFor="btnradio2">
        {SWITCH_OPTIONS.secondOption.title}
      </label>
    </div>
  )
}

export default Switch
