import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials");
};

const getAllPagination = (params) => {
  return http.get("/tutorials", { params });
};

const get = id => {
  return http.get(`/tutorials/${id}`);
};

const create = data => {
  return http.post("/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const updatePublished = (id, data) => {
  return http.patch(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  updatePublished,
  remove,
  removeAll,
  findByTitle,
  getAllPagination
};
