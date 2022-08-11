import useSWR, { SWRConfiguration } from 'swr'

export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR(`/api${url}`, config)

  return {
    data,
    error: error,
    isLoading: !error && !data,
  }
}
