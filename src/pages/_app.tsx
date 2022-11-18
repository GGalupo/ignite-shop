import type { AppProps } from "next/app";
import Image from "next/image";

import logoImg from "../../public/logo-ignite-shop.svg";
import { globalStyles } from "../styles";
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Ignite Shop logo" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
