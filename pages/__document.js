import { Provider } from 'react-redux'
import { configureStore } from './store'

import Head from 'next/head'

const styles = `
  width: '60%',
  marginLeft: '20%'
`

const PageFactory = Page => ({...props}) => (
  <div>
    <Head>
      <title>So Much To-Do, So Little Time</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" rel="stylesheet"/>
    </Head>
    <Page {...props} />
  </div>
)

export default PageFactory
