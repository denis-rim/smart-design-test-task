import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";
import {
  ErrorNotification,
  NotificationModal,
} from "../components/NotificationModal";

const INITIAL_PRODUCT = {
  name: "",
  brand: "Apple",
  ram: "1GB",
  storage: "16GB",
  description: "",
  price: "0",
  imageUrl: "",
  category: "Phone",
  color: "Black",
};

function CreateProductPage() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setProduct((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setIsLoading(true);

      await axios.post("http://localhost:5000/api/products", product);

      setProduct(INITIAL_PRODUCT);

      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 4000);
    } catch (error) {
      let errorMessage = "Error: ";

      // On validation error get first error message
      if (axios.isAxiosError(error) && error?.response?.data[0].message) {
        // @ts-ignore
        errorMessage += error.response.data[0].message;
      } else if (axios.isAxiosError(error) && error) {
        errorMessage += error;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="m-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <NotificationModal showModal={showModal} />
            {Boolean(error) && <ErrorNotification text={error} />}

            <div className="space-y-8 divide-y divide-gray-200">
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add new product
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brand
                    </label>
                    <div className="mt-1">
                      <select
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Apple</option>
                        <option>Samsung</option>
                        <option>Xiaomi</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price (in € / EUR)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="ram"
                      className="block text-sm font-medium text-gray-700"
                    >
                      RAM
                    </label>
                    <div className="mt-1">
                      <select
                        id="ram"
                        name="ram"
                        value={product.ram}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>1GB</option>
                        <option>2GB</option>
                        <option>4GB</option>
                        <option>6GB</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="storage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Storage
                    </label>
                    <div className="mt-1">
                      <select
                        id="storage"
                        name="storage"
                        value={product.storage}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>16GB</option>
                        <option>32GB</option>
                        <option>64GB</option>
                        <option>128GB</option>
                        <option>256GB</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Phone</option>
                        <option>Tablet</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="color"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Color
                    </label>
                    <div className="mt-1">
                      <select
                        id="color"
                        name="color"
                        value={product.color}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Black</option>
                        <option>Grey</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image URL
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        value={product.imageUrl}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="description"
                        id="description"
                        value={product.description}
                        onChange={(e) => handleChange(e)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateProductPage;
