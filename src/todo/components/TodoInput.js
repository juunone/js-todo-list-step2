import Event from "../utils/event.js";
import { TARGETS,MESSAGES } from "../../shared/utils/constants.js";
import { TodoStore } from "../stores/index.js";

class TodoInput {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.addTodo = Event.addTodo;
    this.setGlobalState = setGlobalState;

    document.addEventListener("keypress", this.onKeypress);
  }

  onKeypress = async e => {
    const todoValue = this.$target.value;

    if (e.target.id === "new-todo" && e.key === "Enter" && todoValue) {
      const { activeUser } = TodoStore.getStore;
      await this.addTodo({ _id: activeUser, contents: todoValue });
      this.setGlobalState();
      this.$target.value = "";

      if(todoValue.length < 2){
        alert(MESSAGES.TODO_CONTENTS_ALERT)
      }
    }
  };
}

export default TodoInput;
