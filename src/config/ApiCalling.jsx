const token = "adf454add5ffa5dsff";
export const postApi = async (url, data) => {
  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });

  const result = res.json();

  return result;
};

export const getApi = async (url) => {
  const res = await fetch(url);
  const result = res.json();
  return result;
};

export const patchApi = async (url, updateData) => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const result = res.json();
  return result;
};

export const deleteApi = async (url) => {
  const res = await fetch(url, {
    method: "DELETE",
  });
  const result = res.json();
  return result;
};
