import { type NextPage } from "next";
import { useRouter } from "next/router";

const Product: NextPage = () => {
  const { query } = useRouter();

  return <h1>Product {query.id} page</h1>;
};

export default Product;
