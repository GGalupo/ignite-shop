import { type NextPage } from "next";
import Link from "next/link";

import { ImageContainer, SuccessContainer } from "../styles/pages/success";

const Success: NextPage = () => {
  return (
    <SuccessContainer>
      <h1>Successful purchase!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Wohoo, <strong>@ggalupo</strong>! Your payment for T-shirt is OK and
        it&apos;ll be sent to you as soon as possible!
      </p>

      <Link href="/">Back to products</Link>
    </SuccessContainer>
  );
};

export default Success;
