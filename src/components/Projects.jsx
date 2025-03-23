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
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/3 p-4">Image</th>
              <th className="w-1/3 p-4">Content</th>
              <th className="w-1/3 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {project &&
              project.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="w-1/3 p-4">
                    <img
                      className="h-[300px] w-full rounded-lg object-cover"
                      src={item.image}
                      alt="Blog"
                    />
                  </td>
                  <td className="w-1/3 p-4">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </td>
                  <td className="w-1/3 p-4">
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
