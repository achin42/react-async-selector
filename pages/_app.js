import '../styles/globals.css'
import Layout from '../components/Layout'
// import { GlobalContext } from '../context/GlobalContext'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <GlobalContext.Provider> */}
        <Component {...pageProps} />
      {/* </GlobalContext.Provider> */}
    </Layout> 
  )
}

export default MyApp
