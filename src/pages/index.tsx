import { type GetServerSideProps } from "next";
import Image from "next/image";
import type Stripe from "stripe";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { stripe } from "../lib";

import shirt1 from "../../public/shirts/shirt-1.png";
import shirt2 from "../../public/shirts/shirt-2.png";
import shirt3 from "../../public/shirts/shirt-3.png";
import { HomeContainer, Product } from "../styles/pages/home";

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product key={product.id} className="keen-slider__slide">
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    };
  });

  return {
    props: {
      products,
    },
  };
};
