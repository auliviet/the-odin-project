import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>
        {this.props.count} task{this.props.count > 1 ? "s" : ""}.
      </p>
    );
  }
}

export default Counter;
