import { useState } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";

import { stripe } from "../../lib";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const handleBuyProduct = async () => {
    setIsCreatingCheckout(true);

    try {
      const response = await axios.post<{ checkoutUrl: string }>(
        "/api/checkout",
        {
          priceId: product.defaultPriceId,
        }
      );

      const checkoutUrl = response.data.checkoutUrl;
      window.location.href = checkoutUrl;
    } catch (e) {
      setIsCreatingCheckout(false);
      console.error(e);
    }
  };

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={520}
          height={480}
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button disabled={isCreatingCheckout} onClick={handleBuyProduct}>
          Buy now
        </button>
      </ProductDetails>
    </ProductContainer>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_MpZ4uTD11aVg8b" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const productId = params.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;
  const formattedPrice = price.unit_amount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount / 100)
    : "$x.xx";

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formattedPrice,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  };
};
