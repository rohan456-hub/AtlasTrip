const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const buildHeaders = (token, hasJson = true) => {
  const headers = {};
  if (hasJson) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return response;
};

export const getJson = async (path, token) => {
  const response = await apiRequest(path, { headers: buildHeaders(token, false) });
  return response.json();
};

export const postJson = async (path, body, token, method = "POST") => {
  const response = await apiRequest(path, {
    method,
    headers: buildHeaders(token),
    body: JSON.stringify(body)
  });
  return response.json();
};

export const uploadFile = async (path, file, token) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiRequest(path, {
    method: "POST",
    headers: buildHeaders(token, false),
    body: formData
  });
  return response.json();
};

export const downloadFile = async (path, token) => {
  const response = await apiRequest(path, {
    headers: buildHeaders(token, false)
  });
  return response.blob();
};
