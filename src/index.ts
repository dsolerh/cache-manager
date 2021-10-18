export default class CacheManager {
  private static cache: any = {};
  private static size: number = 10;

  public static setSize(size: number): void {
    if (size) {
      CacheManager.size = size;
    } else {
      throw new Error('Size cannot be undefined');
    }
  }

  public static getSize(): number {
    return CacheManager.size;
  }

  public static getCount(section: string): number {
    return Object.keys(CacheManager.cache[section]).length;
  }

  public static get(section: string, key: string): any {
    const sec = CacheManager.cache[section];
    if (sec) {
      return sec[key];
    }
    return null;
  }

  public static set(section: string, key: string, value: any): void {
    if (!CacheManager.cache[section]) {
      CacheManager.cache[section] = {};
    }
    if (this.getCount(section) === CacheManager.size) {
      let date = Date.now();
      let keyTD: string = '';
      const secs = CacheManager.cache[section];
      for (const k of Object.keys(secs)) {
        if (secs[k].date <= date) {
          date = secs[k].date;
          keyTD = k;
        }
      }
      delete secs[keyTD];
    }
    CacheManager.cache[section][key] = {
      date: Date.now(),
      value,
    };
  }

  public static clear(section?: string): void {
    if (section) {
      CacheManager.cache[section] = {};
    } else {
      CacheManager.cache = {};
    }
  }
}
