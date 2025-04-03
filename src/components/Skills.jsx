import React, { useEffect, useState } from "react";
import { Icons } from "../utils/dynamicIcons";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const [icon, setIcon] = useState(null);
  const [sendIcons, setSendIcons] = useState("");
  const [text, setText] = useState("");

  const handelSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const imgset = await fetch(
      `https://portfolio-server-theta-seven.vercel.app/create-skills`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ icon: sendIcons, title: text }),
      }
    );
    const result = await imgset.json();
    console.log(result);
    // setSkills([...skills, result.data]);
  };

  const handelDelete = async (id) => {
    const res = await fetch(
      `https://portfolio-server-theta-seven.vercel.app/remove-skill/${id}`,
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
    fetch(`https://portfolio-server-theta-seven.vercel.app/get-skills`)
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
