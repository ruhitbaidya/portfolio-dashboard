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
