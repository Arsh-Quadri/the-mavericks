import Image from "next/image";
import { Inter } from "next/font/google";
import { stripe } from "src/utils/stripe";
import ProductCard from "src/components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      <Image
        src="https://techneo360.com/wp-content/uploads/2019/10/Business-Website-Design-1024x516.png"
        className="w-[75%] mx-auto"
        width={10000}
        height={10000}
      />
      <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
  });

  const products = inventory.data.map((product) => {
    const price = product.default_price;
    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0],
    };
  });

  return {
    props: {
      products,
    },
  };
}
