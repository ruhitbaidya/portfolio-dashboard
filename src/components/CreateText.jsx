import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { port } from "../config/config";
import { postApi } from "../config/ApiCalling";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { textToArr } from "../utils/textToarray";
const CreateText = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [skills, setSkills] = useState([]);
  const [techanology, setTechanology] = useState([]);
  const [category, setCategory] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    const senderData = {
      image,
      title: data?.title,
      description: content,
      category: category,
      url: textToArr(data?.url),
      techanology: techanology,
      fetcher: textToArr(data?.fatcher),
      tags: textToArr(data?.tags),
      advanceFetcher: textToArr(data?.advanceFatcher),
    };
    console.log(senderData);
    const res = await postApi(`${port}/create-project`, senderData);
    console.log(res);
    setMessage("ok done");
  };

  useEffect(() => {
    fetch(`https://my-perso-backend.vercel.app/get-skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data.data));
  }, []);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <label htmlFor="hta">Provied Image URL</label>
                <input
                  className="w-full border p-[10px] rounded-lg"
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Provied Image URL"
                />
              </div>
              <div className="flex justify-center items-center">
                <img className="h-[100px]" src={image} alt="" />
              </div>
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                {...register("title", { required: true })}
                className="w-full border p-[10px] rounded-lg"
                type="text"
                placeholder="Enter Title"
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
            <div>
              <label htmlFor="Category">Select Category</label>
              <select
                onChange={(e) => {
                  if (e.target.value === "") {
                    return;
                  }
                  setCategory(e.target.value);
                }}
                className="w-full p-[10px] border rounded-lg"
              >
                <option value="">--select--</option>
                <option value="Frontend">Frontend</option>
                <option value="Full Stack">Full Stack</option>
              </select>
            </div>
            <div>
              <label htmlFor="url">
                Enter URL Live,Frontend,Backend and use , every url end
              </label>
              <textarea
                {...register("url", { required: true })}
                rows={3}
                className="w-full border rounded-lg p-[10px]"
                placeholder="Enter URL LiveLink Frontend Backend"
              ></textarea>
              {errors.url && <span>This field is required</span>}
            </div>
            <div>
              {techanology.map((item) => (
                <>
                  <span>{item}</span>,
                </>
              ))}
              <label className="block" htmlFor="techanalogy">
                Techanalogy
              </label>
              <select
                onChange={(e) => {
                  const id = e.target.value;
                  if (e.target.value === "") {
                    return;
                  }
                  const findId = techanology?.find((item) => item === id);
                  if (!findId) {
                    setTechanology([...techanology, id]);
                  }
                  toast.error("You Can not Select Same id 2 time");
                }}
                className="w-full p-[10px] border rounded-lg"
              >
                <option value="">--select--</option>
                {skills &&
                  skills.map((item) => (
                    <>
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    </>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Fetchers</label>
              <textarea
                {...register("fatcher", { required: true })}
                rows={3}
                className="w-full p-[10px] border rounded-lg"
                placeholder="Enter Fetcher Every fetcher end use ,"
              ></textarea>
              {errors.fatcher && <span>This field is required</span>}
            </div>
            <div>
              <label htmlFor="">Advance Fetchers</label>
              <textarea
                {...register("advanceFatcher", { required: true })}
                rows={3}
                className="w-full p-[10px] border rounded-lg"
                placeholder="Enter Fetcher Every fetcher end use ,"
              ></textarea>
              {errors.advanceFatcher && <span>This field is required</span>}
            </div>
            <div>
              <label htmlFor="tag">Add Tag every end use ,</label>
              <input
                {...register("tags", { required: true })}
                className="w-full p-[10px] border rounded-lg"
                type="text"
                placeholder="Add Tags"
              />
              {errors.tags && <span>This field is required</span>}
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
