/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import Counter from "./Counter";
import Todo from "./Todo";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: "",
    }));
  }

  handleDelete(e) {
    const index = this.state.todos.indexOf(e);
    this.setState((state) => ({
      ...state,
      todos: state.todos.toSpliced(index, 1),
    }));
  }

  handleEdit(oldValue, newValue) {
    const index = this.state.todos.indexOf(oldValue);
    this.setState((state) => ({
      ...state,
      todos: state.todos.toSpliced(index, 1, newValue),
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <Counter count={this.state.todos.length} />
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <Todo
              key={todo}
              handleDelete={() => this.handleDelete(todo)}
              handleEdit={this.handleEdit}
              todo={todo}
            ></Todo>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
