export interface JSONWebToken {
  token: string;
  type: string;
  username: string;
  authorities: string[];
}
