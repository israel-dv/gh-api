export interface RepoProperties {
  description?: string
  full_name?: string
  language?: string
  name?: string
  private?: boolean
  score?: number
  html_url?: string
}

export interface SearchRepoProperties {
  total_count?: number
  items: Array<RepoProperties>
}
