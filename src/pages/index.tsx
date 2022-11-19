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

  console.log(products);

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={shirt1} width={520} height={480} alt="Shirt 1" />

        <footer>
          <strong>Shirt number 1</strong>
          <span>$39.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt2} width={520} height={480} alt="Shirt 2" />

        <footer>
          <strong>Shirt number 2</strong>
          <span>$39.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="Shirt 3" />

        <footer>
          <strong>Shirt number 3</strong>
          <span>$39.90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={shirt3} width={520} height={480} alt="Shirt 3" />

        <footer>
          <strong>Shirt number 3</strong>
          <span>$39.90</span>
        </footer>
      </Product>
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
