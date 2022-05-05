
export interface Roles {
  user?: boolean;
  professional?: boolean ;
  admin?: boolean;
}

export interface User {
  email: string | null;
  emailVerified: boolean;
  roles: Roles;
  uid: string;
}
