import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

export interface ProductModel {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  manufacturer: string;
  imageUrl: string;
  ram: string;
  storage: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

function HomePage() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get<null, { data: ProductModel[] }>(
          "http://localhost:5000/api/products/"
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    void getProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Products:
        </h2>

        <ProductList products={products} />
      </div>
    </div>
  );
}

export default HomePage;
