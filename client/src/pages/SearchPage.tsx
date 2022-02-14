import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, PlusSmIcon } from "@heroicons/react/solid";

import useDebounce from "../hooks/useDebounce";

import ProductList from "../components/ProductList";
import Spinner from "../components/Spinner/Spinner";
import { ProductModel } from "./HomePage";
import { ErrorNotification } from "../components/NotificationModal";

const filtersGroup = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "samsung", label: "Samsung" },
      { value: "apple", label: "Apple" },
    ],
  },
  {
    id: "ram",
    name: "RAM",
    options: [
      { value: "1GB", label: "1GB" },
      { value: "2GB", label: "2GB" },
      { value: "4GB", label: "4GB" },
      { value: "6GB", label: "6GB" },
    ],
  },
  {
    id: "internalStorage",
    name: "Internal Storage",
    options: [
      { value: "16GB", label: "16GB" },
      { value: "32GB", label: "32GB" },
      { value: "64GB", label: "64GB" },
      { value: "128GB", label: "128GB" },
      { value: "256GB", label: "256GB" },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function SearchPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(keyword, 600);

  useEffect(() => {
    async function searchProducts() {
      try {
        setIsLoading(true);
        setProducts([]);
        setError("");

        const response = await axios.get<null, { data: ProductModel[] }>(
          `http://localhost:5000/api/products/search/?keyword=${debouncedSearch}`
        );

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

    if (debouncedSearch) void searchProducts();
  }, [debouncedSearch]);

  async function handleSubmitSearchInput(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsLoading(true);
    setProducts([]);
    setError("");

    let filterQuery = " ";

    if (filters) {
      const filterKeys = Object.keys(filters);

      if (filterKeys.length) {
        filterQuery = filterKeys
          .map((key) => `${key}=${filters[key]}`)
          .join("&");
      }
    }
    try {
      const response = await axios.get<null, { data: ProductModel[] }>(
        `http://localhost:5000/api/products/search/?${filterQuery}`
      );

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

  const handleSearchCheckBox = (id: string, value: string) => {
    setFilters({ ...filters, [id]: value });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filtersGroup.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-gray-200 pt-4 pb-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="w-full p-2 flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 h-7 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="pt-4 pb-2 px-4">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          {Boolean(error) && <ErrorNotification text={error} />}
          <div className="flex justify-end mt-2">
            <div className="relative flex items-center">
              <form onSubmit={handleSubmitSearchInput}>
                <input
                  type="text"
                  name="keyword"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusSmIcon
                  className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200 space-y-10">
                  {filtersGroup.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      // @ts-ignore
                      className={sectionIdx === 0 ? null : "pt-10"}
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="pt-6 space-y-3">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}`}
                                onClick={() =>
                                  handleSearchCheckBox(section.id, option.value)
                                }
                                type="radio"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-screen w-screen">
                  <Spinner />
                </div>
              ) : (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SearchPage;
