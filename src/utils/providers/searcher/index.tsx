import React from 'react'
import { URI } from 'src/api/client'

interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchContext = React.createContext(null)

export const SearchProvider: React.FC<SearchProviderProps> = ({
  children,
}: SearchProviderProps) => {
  const [search, setSearch] = React.useState('')
  const [typeToSearch, setTypeToSearch] = React.useState('repositories')

  return (
    <SearchContext.Provider
      value={{ typeToSearch, setTypeToSearch, search, setSearch }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
