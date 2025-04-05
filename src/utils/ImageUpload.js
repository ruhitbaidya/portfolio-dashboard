export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("photo", imageFile);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=7ea608de6099c1a44ac39bb34b1d5f36`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = response.json();
  return result;
};
