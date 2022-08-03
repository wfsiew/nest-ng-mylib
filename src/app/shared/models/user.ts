import { Role } from './role';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public roles?: Role[]
  ) { }
}
