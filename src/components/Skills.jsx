import React, { useEffect, useState } from "react";
import { imageUpload } from "../utils/ImageUpload";

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [image, setImage] = useState(null);
  const [disImage, setDisImage] = useState(null);
  const [text, setText] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await imageUpload(image);
    console.log(res);
    if (res.data.display_url) {
      const imgset = await fetch(`http://localhost:5000/create-skills`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ image: res?.data?.display_url, title: text }),
      });
      const result = await imgset.json();
      console.log(result);
      setSkills([...skills, result.data]);
    }
  };
  const handelChange = (e) => {
    const { type, files, value } = e.target;
    if (type === "file" && files[0]) {
      setDisImage(URL.createObjectURL(files[0]));
      setImage(files[0]);
      console.log(files[0]);
    } else if (type === "text") {
      setText(value);
    }
  };

  const handelDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/remove-skill/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.data.deletedCount > 0) {
      const delSkill = skills.filter((item) => item._id !== id);
      setSkills(delSkill);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/get-skills`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setSkills(data?.data);
        }
      });
  }, []);
  return (
    <div className="w-[60%] mx-auto bg-white p-[20px] rounded-lg">
      <div>
        <form className="space-y-6" onSubmit={handelSubmit}>
          <div className="flex justify-center items-center">
            <img
              className="w-[80px] h-[80px] rounded-lg border"
              src={disImage}
              alt="Select Icons PNG Image"
            />
          </div>
          <div>
            <input
              onChange={handelChange}
              type="file"
              className="w-full border p-[10px] rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <input
              onChange={handelChange}
              className="w-full focus:outline-none border p-[10px] rounded-lg"
              type="text"
              placeholder="Enter Skill Name"
            />
          </div>
          <div>
            <button className="w-full bg-blue-700 py-[10px] text-white rounded-lg cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {skills &&
              skills?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      className="w-[50px] h-[50px]"
                      src={item.image}
                      alt=""
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      onClick={async () => await handelDelete(item._id)}
                      className="bg-red-400 py-[8px] px-[20px]"
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
  );
};

export default Skills;
