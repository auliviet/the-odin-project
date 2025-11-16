import { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo: this.props.todo,
      status: "display",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      todo: e.target.value,
    }));
  }

  handleEdit() {
    this.setState((state) => ({
      ...state,
      status: "edit",
    }));
  }

  handleSave() {
    this.props.handleEdit(this.props.todo, this.state.todo);
    this.setState((state) => ({
      ...state,
      status: "display",
    }));
  }

  render() {
    return (
      <li>
        {this.state.status === "display" ? (
          <>
            {this.props.todo}
            <button onClick={this.handleEdit}>Edit</button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="task-entry"
              value={this.state.todo}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleSave}>Save</button>
          </>
        )}
        <button onClick={this.props.handleDelete}>Delete</button>
      </li>
    );
  }
}

export default Todo;
