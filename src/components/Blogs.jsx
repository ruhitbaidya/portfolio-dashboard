import { FaPlus } from "react-icons/fa6";
import CreateText from "./CreateText";
import TextEdit from "./TextEdit";
import { useEffect, useState } from "react";
import { deleteApi, getApi } from "../config/ApiCalling";
import { port } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import BlogsForm from "./BlogsForm";

const Blogs = () => {
  const [editData, setEditData] = useState(null);
  const [blog, setBlog] = useState(null);

  // Fetch blog data
  const getDatas = async () => {
    try {
      const result = await getApi(`${port}/get-blog`);
      setBlog(result.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs. Please try again.");
    }
  };

  // Handle editing a blog
  const handelEditData = (e) => {
    setEditData(e);
  };

  // Handle deleting a blog
  const handelDelete = async (id) => {
    try {
      const res = await deleteApi(`${port}/delete-blog/${id}`);
      if (res?.data?.deletedCount > 0) {
        // Update the UI by removing the deleted blog
        const updatedBlogs = blog.filter((item) => item._id !== id);
        setBlog(updatedBlogs);
        toast.success("Blog deleted successfully!");
      } else {
        toast.error("Failed to delete blog. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Fetch blog data on component mount
  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl">BLOGS</h2>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="flex justify-between items-center gap-[15px] py-[10px] px-[40px] bg-blue-700 text-white rounded-lg"
          >
            <span>Create Blog</span> <FaPlus />
          </button>
        </div>
        <div>
          <div>
            <div className="mt-[30px]">
              <table className="table">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Content</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blog &&
                    blog.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-4">
                          <img
                            className="w-16 h-16 rounded-lg object-cover"
                            src={item.image}
                            alt="Blog"
                          />
                        </td>
                        <td className="p-4">
                          <p className="text-lg font-semibold text-gray-800">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content,
                              }}
                            />
                          </p>
                          <p className="text-gray-600 text-sm">
                            This is my first blog for writing and submitting
                            well.
                          </p>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              document.getElementById("my_modal_6").showModal();
                              handelEditData(item);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handelDelete(item._id)}
                            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal for creating a blog */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <BlogsForm />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* Modal for editing a blog */}
          <dialog id="my_modal_6" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <TextEdit data={editData} text="blog" />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Blogs;
