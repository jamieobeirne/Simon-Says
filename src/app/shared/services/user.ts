
export interface Roles {
  user?: boolean;
  professional?: boolean ;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string,
  roles: Roles;
  isDisabled: boolean;
}

