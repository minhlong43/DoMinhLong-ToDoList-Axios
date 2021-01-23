function Service() {
  (this.getListTask = function () {
    return axios({
      url: "https://6001832508587400174dad7b.mockapi.io/API/todolist",
      method: "GET",
    });
  }),
    (this.addTask = function (user) {
      return axios({
        url: "https://6001832508587400174dad7b.mockapi.io/API/todolist",
        method: "POST",
        data: user,
      });
    }),
    (this.deleteTask = function (id) {
      return axios({
        url: `https://6001832508587400174dad7b.mockapi.io/API/todolist/${id}`,
        method: "DELETE",
      });
    }),
    (this.getTaskById = function (id) {
      return axios({
        url: `https://6001832508587400174dad7b.mockapi.io/API/todolist/${id}`,
        method: "GET",
      });
    }),
    (this.updateTask = function (user) {
      return axios({
        url: `https://6001832508587400174dad7b.mockapi.io/API/todolist/${user.id}`,
        method: "PUT",
        data: user,
      });
    });
}
