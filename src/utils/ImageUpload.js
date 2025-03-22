
export const imageUpload = async(img)=>{
    const formData = new FormData();
    formData.append("image", img)
    const res = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=d5cb5f2bc35537108313306fcdb9b5c0`,{
        method : "POST",
        body : formData
    });
    const result= res.json();
    return result
}


//d5cb5f2bc35537108313306fcdb9b5c0