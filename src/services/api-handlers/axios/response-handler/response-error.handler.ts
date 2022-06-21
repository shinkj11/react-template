import { AxiosError, AxiosResponse } from 'axios';

export default function AxiosResponseError(error: AxiosError): Promise<AxiosResponse> {
  console.error(error.message);
  return Promise.reject(error.response?.data);
}
