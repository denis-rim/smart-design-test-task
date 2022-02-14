import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductList from "../components/ProductList";
import { ErrorNotification } from "../components/NotificationModal";
import Spinner from "../components/Spinner/Spinner";

import { fetchProducts, ProductModel } from "../services/handlers/product";

function HomePage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // On mount fetch products
  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetchProducts();

        setProducts(response.data);
      } catch (error) {
        console.log(error);

        let errorMessage = "Error: ";

        if (axios.isAxiosError(error) && error) {
          errorMessage += error;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    void getProducts();
  }, []);

  return (
    <div className="bg-white mt-2">
      {Boolean(error) && <ErrorNotification text={error} />}
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Products:
        </h2>
        {isLoading ? <Spinner /> : <ProductList products={products} />}
      </div>
    </div>
  );
}

export default HomePage;
