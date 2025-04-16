const endpoints = {
  users: {
    register: "/api/users/register",
    login: "/api/users/login",
    getUserData: "/api/users/",
  },
  tasks: {
    create: "/api/tasks/",
    update: "/api/tasks/:id",
    delete: "/api/tasks/:id",
    getAll: "/api/tasks/",
    getById: "/api/tasks/:id",
  },
};

export default endpoints;
