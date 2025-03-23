import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { patchApi } from "../config/ApiCalling";
import { port } from "../config/config";
import { imageUpload } from "../utils/ImageUpload";
import { ToastContainer, toast } from "react-toastify";
const TextEdit = ({ data, text }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preView, setPreview] = useState(null);
  const handelChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  console.log(data);
  const handelSubmit = async (e) => {
    e.preventDefault();
    let senddata = {};
    if (content && image) {
      const res = await imageUpload(image);
      if (res.data.display_url) {
        senddata = {
          content,
          image: res.data.display_url,
        };
      }
    } else if (content) {
      senddata = {
        content,
      };
    } else if (image) {
      const res = await imageUpload(image);
      if (res.data.display_url) {
        senddata = {
          image: res.data.display_url,
        };
      }
    }
    console.log({ image, content, text });
    if (text === "project") {
      const res = await patchApi(
        `${port}/update-project/${data._id}`,
        senddata
      );
      toast.success(res.message);
    } else if (text === "blog") {
      const res = await patchApi(`${port}/update-blog/${data._id}`, senddata);
      toast.success(res.message);
    }
  };

  useEffect(() => {
    setPreview(data?.image);
    setContent(data?.content);
  }, [data]);
  return (
    <div>
      <div className="">
        <ToastContainer />
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
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={(newContent) => {}}
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
