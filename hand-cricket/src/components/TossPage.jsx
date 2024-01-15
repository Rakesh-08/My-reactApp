import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"

let coin = ["head", "tail"];
let choice=["bat","bowl"]
const TossPage = () => {
  let [coinSelected, setCoinSelected] = useState("");
  let [tossResult, setTossResult] = useState(null);
  let [tossAction, setTossAction] = useState(null);
  let NavigateTo = useNavigate();
  let dispatch = useDispatch();

  let tossTheCoin = () => {
    if (coinSelected == "") {
      alert("please select a side of the coin");
      return
    }
    let randomChoice = coin[Math.floor(Math.random() * 2)];

    if (randomChoice == coinSelected) {
      setTossResult("won");
    } else {
      setTossResult("lost");
      setTossAction(choice[Math.floor(Math.random() * 2)]);
    }

  }

  
  return (
    <div
      style={{
        minHeight: "86vh",
      }}
    >
      <h4
        style={{
          background: "purple",
          color: "white",
          marginTop: "1em",
          padding: "1em",
          textAlign: "center",
          fontSize: "1.2em",
          letterSpacing: "0.2em",
        }}
      >
        IT's <span>TOSS TIME</span>{" "}
      </h4>

      {tossResult ? (
        <div style={{ minHeight: "60vh", margin: "0.3em" }}>
          <h4
            style={{
              textAlign: "center",
              fontSize: "1.2em",
              color: "yellow",
              margin: "1em",
            }}
          >
            {" "}
            {tossResult == "won"
              ? "YaY! you won the Toss"
              : "Sorry! you lose the Toss"}
          </h4>
          {tossResult == "won" ? (

             
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  maxWidth: "30em",
                  margin: "1em",
                }}
              >
                <div
                  onClick={() => setTossAction("bat")}
                  className={`batOrBowl ${tossAction == "bat" && "choosed"}`}
                >
                  batting
                </div>
                <div
                  onClick={() => setTossAction("bowl")}
                  className={`batOrBowl ${tossAction == "bowl" && "choosed"}`}
                  
                >
                  bowling
                </div>
              </div>
            
          ) : (
            <p
              style={{ margin: "1em", fontStyle: "italic", fontSize: "1.1em" }}
            >
              {" "}
              You are going to <span style={{ color: "white" }}>
                 {tossAction}
              </span>{" "}
              first
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => {
              if (tossAction) {
                dispatch({
                  type: "decision",
                  decision:tossAction
                })
                NavigateTo("/Playground")
              }
            }} className="Btn" style={{ background: "orange" }}>
              Start the game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "1em",
            }}
          >
            <div
              onClick={() => setCoinSelected("head")}
              className={`tossCoin ${coinSelected == "head" && "active"}`}
            >
              Head
            </div>
            <div
              onClick={() => setCoinSelected("tail")}
              className={`tossCoin  ${coinSelected == "tail" && "active"}`}
            >
              Tail
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", margin: "2em" }}
          >
            <button
              onClick={tossTheCoin}
              className="Btn"
              style={{ background: "green" }}
            >
              Flip the coin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TossPage