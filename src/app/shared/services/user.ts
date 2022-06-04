
export interface Roles {
  user?: boolean;
  professional?: boolean ;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string,
  /*emailVerified: boolean;*/
  roles: Roles;
  isDisabled: boolean;
}

