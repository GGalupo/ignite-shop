import { type NextPage } from "next";
// import Image from "next/image";
import { useRouter } from "next/router";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

const Product: NextPage = () => {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>{/* <Image /> */}</ImageContainer>

      <ProductDetails>
        <h1>X Shirt</h1>
        <span>$19.90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
          asperiores. Ad rerum vitae ut nam nulla error saepe voluptatibus nisi
          quidem earum blanditiis commodi itaque labore officia sit, ex beatae.
        </p>

        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  );
};

export default Product;
