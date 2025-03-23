import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { patchApi } from "../config/ApiCalling";
import { port } from "../config/config";
import { imageUpload } from "../utils/ImageUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const TextEdit = ({ data, text }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preView, setPreview] = useState(null);

  const handelChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      let senddata = {};

      // Handle image upload if an image is selected
      if (image) {
        const res = await imageUpload(image);
        if (res?.data?.display_url) {
          senddata.image = res.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Add content to senddata if it exists
      if (content) {
        senddata.content = content;
      }

      // If neither image nor content is provided, show an error
      if (!image && !content) {
        toast.error("Please update either the content or the image.");
        return;
      }

      // Make the API call based on the type (project or blog)
      let res;
      if (text === "project") {
        res = await patchApi(`${port}/update-project/${data._id}`, senddata);
      } else if (text === "blog") {
        res = await patchApi(`${port}/update-blog/${data._id}`, senddata);
      }

      // Show success message
      if (res?.message) {
        toast.success(res.message);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  // Set initial data when the component mounts or `data` changes
  useEffect(() => {
    setPreview(data?.image);
    setContent(data?.content);
  }, [data]);

  return (
    <div>
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
      <div className="">
        <div>
          <form onSubmit={handelSubmit} className="space-y-6">
            <div className="flex justify-center items-center">
              <img className="h-[100px]" src={preView} alt="" />
            </div>
            <div>
              <input
                className="w-full border p-[10px] rounded-lg"
                type="file"
                onChange={handelChange}
              />
            </div>
            <div className="list-disc">
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
            <div>
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextEdit;
