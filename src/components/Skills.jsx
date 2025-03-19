import React, { useState } from 'react'

const Skills = () => {
  const [image, setImage] = useState(null);
  const [disImage, setDisImage] = useState(null)
  const [text, setText] = useState("");
  const handelSubmit = (e)=>{
    e.preventDefault();
    console.log({
      image : image,
      text : text
    })
  }
  const handelChange = (e)=>{
    const {type, files, value} = e.target;
    if(type === "file" && files[0]){
      setDisImage(URL.createObjectURL(files[0]))
      setImage(files[0])
    }else if(type === "text"){
      setText(value)
    }
  }
  return (
    <div className='w-[60%] mx-auto bg-white p-[20px] rounded-lg'>
      <div>
        <form className='space-y-6' onSubmit={handelSubmit}>
          <div className='flex justify-center items-center'>
            <img className='w-[80px] h-[80px] rounded-lg border' src={disImage} alt="Select Icons PNG Image" />
          </div>
          <div>
            <input onChange={handelChange} type="file" className='w-full border p-[10px] rounded-lg cursor-pointer' />
          </div>
          <div>
            <input onChange={handelChange} className='w-full focus:outline-none border p-[10px] rounded-lg' type="text" placeholder='Enter Skill Name' />
          </div>
          <div>
            <button className='w-full bg-blue-700 py-[10px] text-white rounded-lg cursor-pointer'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Skills
