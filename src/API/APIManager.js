/**
 *
 *
 */

import axios from 'axios';
import { getCookie } from '../utils/cookieManager';
// import MessageAlert from '../utils/MessageAlert';

export default class APIManager {
  /**
   *
   */
  constructor() {
    // 싱글톤 변수 할당
    if (!APIManager.instance) {
      // this.BASE_URL = `http://localhost:3333/api/v1`;
      this.BASE_URL = process.env.REACT_APP_HOST_URL;
      // Axios모듈
      this.http = axios.create();
      // 타임아웃 설정
      this.http.defaults.timeout = 30000;
      // 싱글톤 인스턴스
      APIManager.instance = this;
    }
    return APIManager.instance;
  }

  /**
   *
   */
  setHeaders = (headers = {}) => {
    this.headers = {
      ...this.headers,
      headers,
    };
  };

  /**
   *
   */
  getHeaders = () => {
    const oat = getCookie('METRICS_ACCECE_TOKEN');
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
      mode: 'no-cors',
      'Access-Control-Allow-Origin': '*',
      ...(oat && { Authorization: `Bearer ${oat}` }),
    };
    return this.headers;
  };

  /**
   * NOTE Usually Arrow function, return has same line.
   */
  get = (url, params = null) => this.getRequest(url, 'GET', params);
  delete = (url, params = null) => this.deleteRequest(url, 'DELETE', params);
  post = (url, body = null, stringify = true) => {
    return this.postRequest(url, body, stringify, 'POST');
  };
  put = (url, body = null, stringify = true) => {
    return this.postRequest(url, body, stringify, 'PUT');
  };
  multipart = (url, body = null) => {
    return this.multipartRequest(url, body, 'POST');
  };

  //FIXME:TEST JOSN TOKEN
  auth = (url, body = null, stringify = true) => {
    return this.authRequest(url, body, stringify, 'POST');
  };
  /**
   * FIXME:TEST JOSN TOKEN
   */
  authRequest = async (url, body = null, stringify = true, method = 'POST') => {
    try {
      const bodyData = body ? (stringify ? JSON.stringify(body) : body) : {};
      const headers = this.getHeaders();
      const response = await fetch(`${this.BASE_URL}${url}`, {
        method,
        headers,
        ...(body && { body: bodyData }),
        // body: JSON.stringify(body)
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * GET & DELETE
   */
  getRequest = async (url, method = 'GET', params) => {
    try {
      const headers = this.getHeaders();
      const queryString = this._jsonToQueryString(params);
      const response = await this.http.get(
        `${this.BASE_URL}${url}${queryString}`,
        {
          method,
          headers,
          timeout: 5000,
        }
      );

      return response.data;
    } catch (error) {
      // timeout 초과시
      if (error.code === 'ECONNABORTED') {
        // MessageAlert.error('네트워크를 확인해주세요');
        return {
          code: 500,
          message: error,
        };
      } else {
        return {
          code: 500,
          message: error,
        };
      }
    }
  };

  /**
   * DELETE
   */
  deleteRequest = async (url, method = 'DELETE', params) => {
    try {
      const headers = this.getHeaders();
      const queryString = this._jsonToQueryString(params);
      // const response = await fetch(`${this.BASE_URL}${url}${queryString}`, {
      const response = await this.http.delete(
        `${this.BASE_URL}${url}${queryString}`,
        {
          method,
          headers,
        }
      );
      return response.data;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * POST & PUT
   */
  postRequest = async (url, body = null, stringify = true, method = 'POST') => {
    try {
      const bodyData = body ? (stringify ? JSON.stringify(body) : body) : {};
      const headers = this.getHeaders();
      const response = await fetch(`${this.BASE_URL}${url}`, {
        method,
        headers,
        ...(body && { body: bodyData }),
        // body: JSON.stringify(body)
      }).finally(
        () =>
          process.env.REACT_APP_DEPLOY_TYPE === 'local' &&
          console.log('경로', `${this.BASE_URL}${url}`)
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * Multipart File
   */
  multipartRequest = async (url, body = null, method = 'POST') => {
    try {
      const config = {
        header: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await this.http.post(url, body, config);
      return response.data;
      // const response = await fetch(`${this.BASE_URL}${url}`, {
      //   method,
      //   headers: {
      //     Accept: '*/*',
      //     'Cache-Control': 'no-cache',
      //     'Accept-Encoding': 'gzip, deflate',
      //     'cache-control': 'no-cache',
      //     'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      //     'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      //     'content-type': 'multipart/form-data',
      //     // boundary: '----WebKitFormBoundaryIn312MOjBWdkffIM',
      //   },
      //   processData: false,
      //   contentType: false,
      //   mimeType: 'multipart/form-data',
      //   body: body,
      // });
      // //console.log(response);
      // const responseJson = await response.json();
      // //console.log("ERROR : ", responseJson);
      // return responseJson;
    } catch (error) {
      // console.log(error);
      return {
        code: 500,
        message: error,
      };
    }
  };

  /**
   * 쿼리스트링 파라미터 만들기
   * --
   */
  _jsonToQueryString = (params = null) => {
    // cno는 필수 파라미터 - 기본값
    let queryString = ``;
    // 파라미터가 있는경우
    if (params) {
      const keys = Object.keys(params);
      if (keys.length > 0) {
        for (let ii in keys) {
          queryString += `&${keys[ii]}=${params[keys[ii]]}`;
        }
        return `?${queryString.slice(1)}`;
      }
    }
    return ``;
  };
}
