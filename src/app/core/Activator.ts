
export class Activator {
  static create<T>(type: (new () => T)): T {
    return new type();
  }
}
