const baseUrl = "https://calm-red-boa-hat.cyclic.app";
// const baseUrl = "http://localhost:5000";

const user = `${baseUrl}/api`;

const ApiConfig = {
  LOGIN_URL: `${user}/login`,
  REGISTER_URL: `${user}/register`,
  CREATE_TODO: `${user}/createTodo`,
  GET_TODO_LIST: `${user}/getTodoList`,
  MARK_TODO_COMPLETE: `${user}/markTodo`,
  DELETE_TODO: `${user}/deleteTodo`,
};
export default ApiConfig;
