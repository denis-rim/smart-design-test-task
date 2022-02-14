import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RadioGroup } from "@headlessui/react";

import { ErrorNotification } from "../components/NotificationModal";
import Spinner from "../components/Spinner/Spinner";

import { ProductModel } from "./HomePage";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProductById() {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get<null, { data: ProductModel }>(
          `http://localhost:5000/api/products/${productId}`
        );

        setProduct(response.data);
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

    void getProductById();
  }, [productId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white">
      {Boolean(error) && <ErrorNotification text={error} />}
      {!product ? (
        <div className="flex content-center justify-center mt-10">
          Product is not found
        </div>
      ) : (
        <div className="pt-6 pb-16 sm:pb-24">
          <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
              <div className="lg:col-start-8 lg:col-span-5">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    {product.price} EUR
                  </p>
                </div>
              </div>

              <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    src={product.imageUrl}
                    className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <form>
                  {/* Color picker */}
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Color</h2>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        <RadioGroup.Option
                          value={product.color}
                          className={`bg-${product.color}-200 -m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`}
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {product.color}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              product.color,
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      </div>
                    </RadioGroup>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to cart
                  </button>
                </form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 prose prose-sm text-gray-500">
                    <ul role="list">
                      <li key={product.ram}>RAM: {product.ram}</li>
                      <li key={product.description}>
                        Internal storage: {product.storage}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>

                  <div
                    className="mt-4 prose prose-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
