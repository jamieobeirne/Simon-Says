
export interface Roles {
  user?: boolean;
  professional?: boolean ;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  roles: Roles;
  active: boolean;
}
