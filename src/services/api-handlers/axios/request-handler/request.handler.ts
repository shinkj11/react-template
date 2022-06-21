import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export default function AxiosRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const headers: AxiosRequestHeaders = {
    'Access-Control-Allow-Origin': '*',
  };
  config.headers = headers;
  return config;
}
