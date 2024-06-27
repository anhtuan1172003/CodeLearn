import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  //1 - 3
  componentDidMount() {
    console.log("Components sau khi hàm render chạy");
  }
  componentDidUpdate(prevState) {
    if (prevState.count !== this.state.count)
      console.log("Components khi có sự thay đổi - onClick increment/decrement");
  }

  // componentWillMount() {
  //   console.log("Components trước khi sinh ra - rendered");

  // }
  //2
  componentWillUnmount() {
    console.log("Components khi hoàn tất việc mount và update");

  }
  incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));

  }
  decrementCount = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }));
  }
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
        <button onClick={this.decrementCount}>Decrement</button>
      </div>

    )
  }
}

export default App;