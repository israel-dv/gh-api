import React, { ReactNode } from 'react'

import SearchProvider from 'src/utils/providers/searcher'
import Navbar from '../Navbar'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <SearchProvider>
      <div className="container-fluid page-container">
        <Navbar />
        <main className="main">{children}</main>
      </div>
    </SearchProvider>
  )
}
