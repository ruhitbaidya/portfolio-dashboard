import { FaPlus } from "react-icons/fa6";

const Blogs = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl">BLGOS</h2>
          <button className="flex justify-between items-center gap-[15px] py-[15px] px-[40px] bg-blue-700 text-white rounded-lg">
            <span>Create Blog</span> <FaPlus />
          </button>
        </div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
