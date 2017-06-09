// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class AppWrapper extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
     <html>
       <Head>
         <style>{`body { margin: 0 20% } /* custom! */`}</style>
         <title>So Much To-Do, So Little Time</title>
         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
       </Head>
       <body className="custom_class">
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
