import Image from "next/image";

import shirt1 from "../../public/shirts/shirt-1.png";
import shirt2 from "../../public/shirts/shirt-2.png";
import shirt3 from "../../public/shirts/shirt-3.png";
import { HomeContainer, Product } from "../styles/pages/home";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} width={520} height={480} alt="Shirt 1" />

        <footer>
          <strong>Shirt number 1</strong>
          <span>$39.90</span>
        </footer>
      </Product>

      <Product>
        <Image src={shirt2} width={520} height={480} alt="Shirt 2" />

        <footer>
          <strong>Shirt number 2</strong>
          <span>$39.90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
