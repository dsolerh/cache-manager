export default class CacheManager {
  private static __cache: any = {};
  private static __size: number = 10;
  constructor() {}

  public static setSize(size: number): void {
    if (size) {
      CacheManager.__size = size;
    } else {
      throw new Error('Size cannot be undefined');
    }
  }

  public static getSize(): number {
    return CacheManager.__size;
  }

  public getCount(section: string): number {
    return Object.keys(CacheManager.__cache[section]).length;
  }

  public get(section: string, key: string): any {
    let sec = CacheManager.__cache[section];
    if (sec) {
      return sec[key];
    }
    return null;
  }

  public set(section: string, key: string, value: any): void {
    if (!CacheManager.__cache[section]) {
      CacheManager.__cache[section] = {};
    }
    if (this.getCount(section) === CacheManager.__size) {
      let date = Date.now();
      let key: string = '';
      const secs = CacheManager.__cache[section];
      for (const k of Object.keys(secs)) {
        if (secs[k].date <= date) {
          date = secs[k].date;
          key = k;
        }
      }
      delete secs[key];
    }
    CacheManager.__cache[section][key] = {
      date: Date.now(),
      value: value,
    };
  }

  public clear(section?: string): void {
    if (section) {
      CacheManager.__cache[section] = {};
    } else {
      CacheManager.__cache = {};
    }
  }
}
