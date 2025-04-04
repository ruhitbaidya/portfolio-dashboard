export const textToArr = (text)=>{
    const arr = text.split(",").map((rem)=> rem.trim()).filter((item)=> item !== "");
    return arr
}