import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

const LandingPage = () => {
    let [checked, setChecked] = useState(false);
    let NavigateTo = useNavigate();

    let RouteToToss = () => {
        if (!checked) {
            alert("please select the checkbox first!"); 
            return;
        }
        NavigateTo("/Toss")
    }
  return (
    <div
      style={{
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContetent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "0.5em",
          margin: "0.5em",
        }}
      >
        <p
          style={{
            color: "pink",
            fontSize: "1.2em",
            marginBottom: "1em",
            textDecoration: "underline",
          }}
        >
          Rules To Play:
        </p>
        <ul style={{ marginBottom: "1em" }}>
          <li>Its a hand-cricket match game of one over each side. </li>
          <li>
            There will be 3 rounds in Total and whoever wins the most matches
            will won the game.{" "}
          </li>
          <li>
            Before each round, there will be a toss to decide who is going to
            bat first.
          </li>
          <li>
            The player batting first will pick a number between 1-6 for each
            ball of an over and bowler will try to guess the number and if he
            guessed it correctly the batsman will be out and then the bowler
            will bat and try to score more than the batsman to win the match.{" "}
          </li>
          <li>
            similar to this round , there will be 2 more rounds to decide the
            ultimate winner the game{" "}.
          </li>
          <li>
            After finishing all 3 rounds, it could be possible that you and
            the other player has won equal matches because of some draw matches, so you can re-play the game to decide the winner.
          </li>
          <li>So lets start the game...</li>
        </ul>
        <input onClick={(e) => setChecked(e.target.checked)} type="checkbox" />{" "}
        <span style={{ color: "white", marginLeft: "0.4em" }}>
          Have you read all the details and rules of the game{" "}
        </span>
      </div>

      <button
        onClick={RouteToToss}
        style={{
          background: "orange",
          padding: '0.5em',
          border:"pink",
          marginTop: "8vh",
           boxShadow: "1px 1px 0.3em 0.1em pink" ,fontStyle:"italic"
        }}
      >
        Proceed To Play
      </button>
    </div>
  );
}

export default LandingPage