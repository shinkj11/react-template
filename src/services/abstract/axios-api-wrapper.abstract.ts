import { AxiosRequestConfig } from "axios";
import AxiosInterceptor, {
  CustomInstance,
} from "../interceptors/rest-api/axios.interceptors";

export abstract class AxiosApiWrapper {
  abstract endPoint: string;
  baseUrl: string;
  axios: CustomInstance;

  constructor() {
    this.baseUrl = "http://localhost:8080";
    this.axios = AxiosInterceptor.getAxiosInstance();
  }

  get<T>(config?: AxiosRequestConfig): Promise<T> {
    return this.axios.get<T>(`${this.baseUrl}/${this.endPoint}`, config);
  }

  post<T>(data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.post<T>(`${this.baseUrl}/${this.endPoint}`, data, config);
  }

  put<T>(
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.put(`${this.baseUrl}/${this.endPoint}`, data, config);
  }

  patch<T>(
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.patch(`${this.baseUrl}/${this.endPoint}`, data, config);
  }

  delete<T>(config?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(`${this.baseUrl}/${this.endPoint}`, config);
  }
}
