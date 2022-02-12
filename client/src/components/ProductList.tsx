import { Link } from "react-router-dom";
import { ProductModel } from "../pages/HomePage";

function ProductList({ products }: { products: ProductModel[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product._id} className="group relative">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
              src={product.imageUrl}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {product.price} EUR
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
