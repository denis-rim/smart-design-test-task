import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="max-w-7xl mx-auto mt-4 sm:px-6 lg:px-8">
        <div className="md:flex border-b pb-4 md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              <Link to="/">Test Task for Smart Design</Link>
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              to="/search"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </Link>
            <Link
              to="/create"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
