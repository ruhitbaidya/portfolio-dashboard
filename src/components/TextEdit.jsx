import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const TextEdit = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preView, setPreview] = useState(null);
  const handelChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log({ image, content });
  };
  return (
    <div>
      <div className="w-[70%] mx-auto">
        <div>
          <form onSubmit={handelSubmit} className="space-y-6">
            <div className="flex justify-center items-center">
              <img className="h-[300px]" src={preView} alt="" />
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
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
            <div>
              <button></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TextEdit;
