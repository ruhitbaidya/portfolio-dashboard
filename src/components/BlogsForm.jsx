import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./blogForm.css";
import { textToArr } from "../utils/textToarray";
const BlogsForm = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(``);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const dataFi = {
      title,
      content,
      category,
      image: image,
      tags: textToArr(tags),
    };
    console.log(dataFi);
    const res = await fetch(`https://my-perso-backend.vercel.app/create-blog`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataFi),
    });
    const result = await res.json();
    console.log(result);
    // console.log({ title, content, category, image, tags });
  };
  return (
    <div>
      <form onSubmit={handelSubmit} className="space-y-9">
        <div className="flex justify-between items-center">
          <div>
            <label htmlFor="sel">Select Image</label>
            <input
              onChange={(e) => {
                const file = e.target.value;
                setImage(file);
              }}
              type="text"
              className="w-full p-[10px] border rounded-lg"
            />
          </div>
          <div>
            <img className="w-[200px] h-[200px]" src={image} alt="no image" />
          </div>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-[10px] rounded-lg"
            type="text"
            placeholder="Enter your Title"
          />
        </div>
        <div className="prose">
          <label htmlFor="dedit">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={{
              editorCssClass: "jodit-tailwind-content", // Add this class
              style: {
                "ul,ol": "padding-left: 1.5em; margin: 1em 0;",
                ul: "list-style-type: disc;",
                ol: "list-style-type: decimal;",
                li: "display: list-item; margin-bottom: 0.5em;",
              },
            }}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <div>
          <label htmlFor="category">Categiry</label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-[10px] rounded-lg"
            type="text"
            placeholder="Enter your Title"
          />
        </div>
        <div>
          <label htmlFor="category">Tags</label>
          <input
            onChange={(e) => setTags(e.target.value)}
            className="w-full border p-[10px] rounded-lg"
            type="text"
            placeholder="Enter your Title"
          />
        </div>
        <div>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BlogsForm;
