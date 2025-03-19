import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white w-64 fixed h-full shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/dashboard/projects"
            className="block py-2 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Projects
          </NavLink>
          <NavLink
            to="/dashboard/blogs"
            className="block py-2 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Blogs
          </NavLink>
          <NavLink
            to="/dashboard/skills"
            className="block py-2 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Skills
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back, User!
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
