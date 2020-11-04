import {
  TodoInput,
  TodoUserList,
  TodoList,
  TodoCount
} from "./components/index.js";
import { TodoStore } from "./models/index.js";

import {
  filterActiveTodoUsers,
  filterActiveUserTodos
} from "./utils/validator.js";

import { requestFetch } from "../shared/utils/repository.js";
import { BASE_URL, TARGETS } from "../shared/utils/constants.js";

class Todo {
  constructor() {
    this.state = TodoStore.getStore;

    this.todoInput = new TodoInput({
      $target: document.querySelector(TARGETS.TODO_INPUT)
    });

    this.todoUserList = new TodoUserList({
      $target: document.querySelector(TARGETS.TODO_USER_LIST),
      userList: this.state.userList,
      activeUser: this.state.activeUser,
      onChangeActiveUser: this.onChangeActiveUser
    });

    this.todoList = new TodoList({
      $target: document.querySelector(TARGETS.TODO_LIST),
      todos: this.state.todos
    });

    this.todoCount = new TodoCount({
      $target: document.querySelector(TARGETS.TODO_COUNT),
      count: this.state.count
    });
  }

  onChangeActiveUser = ({ activeUser }) => {
    TodoStore.changeActiveUser(activeUser);
    this.setState();
  };

  setState = () => {
    this.state = TodoStore.getStore;
    console.log("state:::", this.state);

    this.todoUserList.setState({
      userList: this.state.userList,
      activeUser: this.state.activeUser
    });

    this.todoList.setState({ todos: this.state.todos });

    this.todoCount.setState({ count: this.state.count });
  };

  init = async () => {
    const userList = filterActiveTodoUsers(
      await requestFetch({
        url: BASE_URL,
        method: "GET",
        uri: "/api/users"
      })
    );

    TodoStore.setState({
      userList,
      todos: userList[0].todoList,
      count: userList[0].todoList.length,
      activeUser: userList[0]._id
    });

    this.setState();
  };
}

export default Todo;
