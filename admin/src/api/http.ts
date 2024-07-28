import { createAlova } from 'alova';
import GlobalFetch from 'alova/fetch';
import ReactHook from 'alova/react';

const headers = { 'Content-type': 'application/jso;charset=UTF-8' };
const timeout = 5000;
export const Instance = createAlova({
  baseURL: '/',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  // 请求拦截器
  beforeRequest() {},
  responded: {
    onSuccess: async (response: Response) => {
      const json = await response.json();
      if (json.code == 200) {
        return json.data;
      } else {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message);
      }
    },
    // 抛出错误时，将会进入请求失败拦截器内
    onError: (error) => {
      throw new Error(error);
    }
  }
});

export const http = {
  Get(url: string, params: object) {
    console.log('params', params);

    return Instance.Get(url, {
      headers,
      params,
      timeout
    });
  },
  Post(url: string, data: object, params?: object) {
    return Instance.Post(url, data, { params });
  },
  Patch(url: string, data: object, params?: object) {
    return Instance.Patch(url, data, { params });
  },
  Delete(url: string, data: object, params?: object) {
    return Instance.Delete(url, data, { params });
  }
};
