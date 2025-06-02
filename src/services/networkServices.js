// ✅ ONE generic helper so you don’t repeat yourself
const request = async (url, { method = "GET", body } = {}) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  // ⛑️  Throw a readable error *before* trying to .json()
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json();
};

export const get = (url) => request(url);
export const post = (url, body) => request(url, { method: "POST", body });
