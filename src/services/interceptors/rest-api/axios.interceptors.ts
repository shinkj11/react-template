import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse as axiosResponse,
} from "axios";
import AxiosRequestError from "../../api-handlers/axios/request-handler/request-error.handler";
import AxiosRequest from "../../api-handlers/axios/request-handler/request.handler";
import AxiosResponseError from "../../api-handlers/axios/response-handler/response-error.handler";
import AxiosResponse from "../../api-handlers/axios/response-handler/response.handler";

export interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<axiosResponse>;
  };
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

class AxiosInterceptor {
  constructor() {
    axios.interceptors.request.use(AxiosRequest, AxiosRequestError);
    axios.interceptors.response.use(AxiosResponse, AxiosResponseError);
  }

  getAxiosInstance(): CustomInstance {
    return axios;
  }
}

export default new AxiosInterceptor();
