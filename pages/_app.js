import '../styles/globals.css'
import Layout from '../components/Layout'
import { RecoilRoot } from "recoil";
// import { GlobalContext } from '../context/GlobalContext'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        {/* <GlobalContext.Provider> */}
          <Component {...pageProps} />
        {/* </GlobalContext.Provider> */}
      </Layout> 
    </RecoilRoot>
  )
}

export default MyApp
