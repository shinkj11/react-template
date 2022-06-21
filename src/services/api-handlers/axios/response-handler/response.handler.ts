import { AxiosInterceptorManager, AxiosResponse as axiosResponse } from 'axios';

export default function AxiosResponse(response: axiosResponse): AxiosInterceptorManager<axiosResponse> {
  return response.data;
}
