export interface LoginResponse {
  bearer: string
  token: string
  username: string
  authorities: Authority[]
}

export interface Authority {
  authority: string
}
