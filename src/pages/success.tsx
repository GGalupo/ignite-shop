import { type GetServerSideProps, type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../lib";

import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

const Success: NextPage<SuccessProps> = ({ customerName, product }) => {
  return (
    <SuccessContainer>
      <h1>Successful purchase!</h1>

      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={120}
          height={110}
        />
      </ImageContainer>

      <p>
        Wohoo, <strong>{customerName}</strong>! Your payment for {product.name}{" "}
        is OK and it&apos;ll be sent to you as soon as possible!
      </p>

      <Link href="/">Back to products</Link>
    </SuccessContainer>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
