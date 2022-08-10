import { IProduct } from 'interfaces'
import useSWR, { SWRConfiguration } from 'swr'

interface IUseProducts {
  products: IProduct[]
  message: string
}

export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IUseProducts>(`/api${url}`, config)

  return {
    products: data?.products ?? [],
    error: error,
    isLoading: !error && !data,
  }
}
