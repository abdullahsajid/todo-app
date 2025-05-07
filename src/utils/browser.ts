// POSSIBLY DELETE THIS FILE
namespace BrowserUtils {
  export const save = (key: string, value: any) => {
    window.localStorage.setItem(key, value);
  };

  export const get = (key: string) => {
    return window.localStorage.getItem(key);
  };

  export const saveObj = (key: string, obj: object) => {
    window.localStorage.setItem(key, JSON.stringify(obj));
  };

  export const getObj = (key: string) => {
    const temp = window.localStorage.getItem(key);
    if (temp) {
      return JSON.parse(temp);
    }
    return null;
  };

  export const remove = (key: string) => {
    window.localStorage.removeItem(key);
  };

  export const removeAll = () => {
    window.localStorage.clear();
  };
}

export default BrowserUtils;