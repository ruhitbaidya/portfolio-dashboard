import { FaPlus } from "react-icons/fa6";
import TextEdit from "./TextEdit";
import CreateText from "./CreateText";
import { useEffect, useState } from "react";
import { deleteApi, getApi } from "../config/ApiCalling";
import { port } from "../config/config";
const Projects = () => {
  const [editData, setEditData] = useState(null);
  const [project, setProject] = useState(null);
  const getProject = async () => {
    const result = await getApi(`${port}/getAllProject`);
    setProject(result.data);
  };
  const handelEditData = (e) => {
    setEditData(e);
  };
  const handelDelete = async (e) => {
    console.log(e);
    const res = await deleteApi(`${port}/delete-project/${e}`);
    if (res.data.deletedCount > 0) {
      const delPro = project.filter((item) => item._id !== e);
      setProject(delPro);
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="uppercase text-4xl">Project</h2>
        <button
          onClick={() => document.getElementById("my_modal_4").showModal()}
          className="flex justify-between py-[10px] px-[35px] items-center gap-[15px] bg-blue-700 text-white rounded-lg"
        >
          <span>Create Project</span> <FaPlus />
        </button>
      </div>
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
            {project &&
              project.map((item) => (
                <>
                  <tr className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      <img
                        className="w-16 h-16 rounded-lg object-cover"
                        src={item.image}
                        alt="Blog"
                      />
                    </td>
                    <td className="p-4">{item.content}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
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
                </>
              ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <CreateText text="project" />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <TextEdit data={editData} text="project" />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Projects;
