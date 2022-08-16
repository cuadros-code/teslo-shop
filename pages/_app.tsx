import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from 'themes';
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import { UiProvider, CartProvider } from 'context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <UiProvider>
          <CartProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </CartProvider>
        </UiProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
