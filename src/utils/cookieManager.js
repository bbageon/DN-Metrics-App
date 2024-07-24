/**
 * 쿠키찾기
 * --
 */
export const getCookie = (name, options = null) => {
    const value = window.document.cookie.match(
      '(^|;) ?' + name + '=([^;]*)(;|$)'
    );
    return value ? value[2] : null;
  };
  
  /**
   * 쿠키저장
   */
  export const setCookie = (name, value, callback = false) => {
    window.document.cookie = `${name}=${value}; path=/`;
    if (callback) callback();
  };
  
  /**
   * 쿠키삭제
   */
  export const removeCookie = (name, value, d) => {
    const t = new Date();
    d = d === '' ? '' : '; expires=' + t.setTime(t.getTime() + d);
  
    document.cookie =
      name +
      '=' +
      escape(value) +
      '; path=/' +
      (d ? '; expires=' + t.toGMTString() : '');
  };
  
  /**
   * 쿠키삭제
   */
  export const deleteCookie = (name, { path, domain }) => {
    if (getCookie(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  };
  
  /**
   * API파라미터 Replace함수
   * --
   */
  export const parameterToPath = (path, params = {}) => {
    const keys = Object.keys(params);
    let newStr = '';
    for (let key of keys) {
      newStr = path.replace(`:${key}`, params[key]);
    }
    return newStr;
  };
  