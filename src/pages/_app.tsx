import type { AppProps } from "next/app";
import Image from "next/image";

import { globalStyles } from "../styles";
import { Container, Header } from "../styles/pages/app";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image
          src="/logo-ignite-shop.svg"
          alt="Ignite Shop logo"
          width={130}
          height={52}
        />
      </Header>
      <Component {...pageProps} />;
    </Container>
  );
}
