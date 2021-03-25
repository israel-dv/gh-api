import React from 'react'

interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchContext = React.createContext(null)

export const SearchProvider: React.FC<SearchProviderProps> = ({
  children,
}: SearchProviderProps) => {
  const [url, setUrl] = React.useState('')
  const [typeToSearch, setTypeToSearch] = React.useState('repositories')

  return (
    <SearchContext.Provider
      value={{ typeToSearch, setTypeToSearch, url, setUrl }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
