import "./styles.css";
import { Component } from "react";
import Board from "./component/board";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="gameTitle">Tic-Tac-Toe Game
        </h2>

        <Board />
      </div>
    );
  }
}
export default App;
