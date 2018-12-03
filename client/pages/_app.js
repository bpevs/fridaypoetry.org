import App, { Container } from "next/app"
import Head from "next/head"
import React from "react"
import NavBar from "../components/NavBar"


export default class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.router = router

    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <Container>
        <Head>
          <title>Friday Poetry</title>
        </Head>
        <NavBar path={router.route} />
        <Component {...pageProps } />
      </Container>
    )
  }
}
