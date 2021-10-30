
export class User {
  static clone(obj: User) {
    return JSON.parse(JSON.stringify(obj));
  }

  _id?: string;
  group: string;
  username: string;
  password: string;
  active: boolean;
}
