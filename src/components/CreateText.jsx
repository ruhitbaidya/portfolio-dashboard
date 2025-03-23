import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { port } from "../config/config";
import { postApi } from "../config/ApiCalling";
import { imageUpload } from "../utils/ImageUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const CreateText = ({ text }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preView, setPreview] = useState(null);

  const handelChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handelSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const imageup = await imageUpload(image);
      console.log(imageup);

      if (imageup?.data?.display_url) {
        let res;
        if (text === "project") {
          res = await postApi(`${port}/create-project`, {
            image: imageup?.data?.display_url,
            content,
          });
        } else if (text === "blog") {
          res = await postApi(`${port}/create-blog`, {
            image: imageup?.data?.display_url,
            content,
          });
        }

        if (res?.message) {
          setLoading(false);
          setMessage(text === "project" ? "Project Created" : "Blog Created");
          toast.success(res.message); // Show success toast
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again."); // Show error toast
      console.error("Error:", error);
    }
  };

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
        {loading ? <p>Loading.......</p> : <p>{message}</p>}
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
            <div>
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

export default CreateText;
