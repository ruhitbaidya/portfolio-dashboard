
export const imageUpload = async(img)=>{
    const formData = new FormData();
    formData.append("image", img)
    const res = await fetch(`https://api.imgbb.com/1/upload?key=8096e51030c03a825538e73342024d1c`,{
        method : "POST",
        body : formData
    });
    const result= res.json();
    return result
}
