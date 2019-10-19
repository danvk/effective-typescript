declare function hash(text: string): number;
class PasswordChecker {
  private password: string;

  constructor() {
    this.password = 's3cret';
  }

  checkPassword(password: string) {
    return password === this.password;
  }
}

const checker = new PasswordChecker();
const password = (checker as any).password;
