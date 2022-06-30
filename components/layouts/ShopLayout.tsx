import { FC, ReactNode } from "react"
import Head from "next/head"
import { NavBar, SideMenu } from "../ui"

interface IProps {
  title: string
  pageDescription: string
  imageFullUrl?: string
  children: ReactNode | ReactNode[]
}

export const ShopLayout: FC<IProps> = ({ children ,pageDescription, title, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        { imageFullUrl && <meta property="og:image" content={imageFullUrl} /> }
      </Head>
      <nav>
        <NavBar />
      </nav>
      <SideMenu />
      <main style={{
        margin: "80px auto",
        maxWidth: "1440px",
        padding: "0px 30px",
      }}>
        {children}
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default ShopLayout