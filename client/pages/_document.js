import Document, { Head, Main, NextScript } from "next/document"
import React from "react"
import stylesheet from "../index.css"


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html charSet="UTF-8">
        <Head>
          <meta name="author" content="Friday Poetry" />
          <meta name="title" content="Friday Poetry" />
          <meta name="description" content="Poetry for Fridays" />
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0" />

          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <noscript><style>{".jsonly { display: none }"}</style></noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
