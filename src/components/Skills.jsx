import React, { useEffect, useState } from "react";
import { Icons } from "../utils/dynamicIcons";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const [icon, setIcon] = useState(null);
  const [sendIcons, setSendIcons] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const handelSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(sendIcons, text, color);
    const res = await fetch(
      `https://my-perso-backend.vercel.app/create-skills`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ icon: sendIcons, title: text, color }),
      }
    );
    const result = await res.json();
    console.log(result);
    if (result.data._id) {
      setLoading(false);
      setSendIcons("");
      setText("");
      setColor("");
      setSkills([...skills, result.data]);
      console.log(result);
    } else {
      setLoading(false);
      console.log(result.data);
    }
  };

  const handelDelete = async (id) => {
    const res = await fetch(
      `https://my-perso-backend.vercel.app/remove-skill/${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    if (result.data.deletedCount > 0) {
      const delSkill = skills.filter((item) => item._id !== id);
      setSkills(delSkill);
    }
  };

  useEffect(() => {
    fetch(`https://my-perso-backend.vercel.app/get-skills`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          console.log(data?.data);
          setSkills(data?.data);
        }
      });
  }, []);
  return (
    <div className="w-[60%] mx-auto bg-white p-[20px] rounded-lg">
      <div>
        <form className="space-y-6" onSubmit={handelSubmit}>
          <div className="flex justify-center items-center">{icon}</div>
          <div>
            <input
              onChange={(e) => {
                setIcon(<Icons iconName={e.target.value} size={40} />);
                setSendIcons(e.target.value.trim());
              }}
              type="text"
              className="w-full border p-[10px] rounded-lg"
              placeholder="Give only Icons name react-icons"
            />
          </div>
          <div>
            <input
              onChange={(e) => setText(e.target.value.trim())}
              className="w-full focus:outline-none border p-[10px] rounded-lg"
              type="text"
              placeholder="Enter Skill Name"
            />
          </div>
          <div>
            <label className="block" htmlFor="">
              Select Color code
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full border p-[10px] rounded-lg"
              placeholder="#hex Color code provied"
            />
          </div>
          <div>
            <button className="w-full bg-blue-700 py-[10px] text-white rounded-lg cursor-pointer">
              {loading ? <>Loading...</> : "Submit"}
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
                    <Icons
                      iconName={item?.icon}
                      style={{ color: item?.color }}
                      size={40}
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
