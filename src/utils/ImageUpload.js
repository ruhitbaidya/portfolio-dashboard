export const imageUpload = async (imageFile) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      const base64Image = event.target.result.split(",")[1];

      try {
        const formData = new FormData();
        formData.append("image", base64Image);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=7ea608de6099c1a44ac39bb34b1d5f36`,
          {
            method: "POST",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });
};
