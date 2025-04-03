export const imageUpload = async (img) => {
  const formData = new FormData();
  formData.append("image", img);

  try {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.imgbb.com/1/upload?key=8096e51030c03a825538e73342024d1c`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Some proxies may require this header
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    if (!res.ok) throw new Error("Upload failed");
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
