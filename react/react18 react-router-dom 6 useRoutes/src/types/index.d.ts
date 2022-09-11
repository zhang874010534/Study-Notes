declare module 'axios' {
  interface AxiosInstance<T = any> {
    (config: AxiosRequestConfig): Promise<T>
  }
}

export {}
