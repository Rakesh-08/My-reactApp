import React, { useState, useEffect,useMemo } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Recommedation from "./Recommedation";

let ScoreOptions = [1, 2, 3, 4, 5, 6];
let MemoizedRecommendation = React.memo(Recommedation);


const PlayGroundPage = () => {
  let {decision,parts} = useSelector((state) => state.tossResult);
  let [firstChoice, setFirstChoice] = useState(decision);
  let [firstInning, setFirstInning] = useState(true);
  let [timerEnds, setTimerEnds] = useState(false);
  let [timerRestarts, setTimerRestarts] = useState(false);
  let [rounds, setRounds] = useState(parts);
  let [showTarget, setShowTarget] = useState(false);
  let [target, setTarget] = useState(0);
  let [yourScoreCard, setYourScoreCard] = useState([]);
  let [otherScoreCard, setOtherScoreCard] = useState([]);
  let [pickedScore, setPickedScore] = useState(null);
  let [otherScore, setOtherScore] = useState(null);
  let [inningsBall, setInningsBall] = useState({
    first: 6,
    second: 6,
  });

  let [showMatchModal, setShowMatchModal] = useState(false);
  let [modalContent, setModalContent] = useState({ desc: "", btn: "" });

  
  useEffect(() => {
  
    if (timerEnds) {
       setTimerEnds(false)
      Timer()
      return;
    }
  }, [timerEnds]);


  let Timer = () => {
    let pickedByOtherPlayer = ScoreOptions[Math.floor(Math.random() * 6)];
    setOtherScore(pickedByOtherPlayer, "first");

    // minus one ball from the over
    if (inningsBall.first >= 1) {
      setInningsBall({ ...inningsBall, first: inningsBall.first - 1 });
    } else {
      setInningsBall({ ...inningsBall, second: inningsBall.second - 1 });
    }

    if (pickedScore == pickedByOtherPlayer) {
      // out- proceed to second inning or decide the winner of the match

      if (firstChoice == "bat") {
        setYourScoreCard([...yourScoreCard, "W"]);
      } else {
        setOtherScoreCard([...otherScoreCard, "W"]);
      }

      if (firstInning) {
        setInningsBall({ ...inningsBall, first: 0 });
        setFirstInning(false);
        goToNextInning();
      } else {
        calcMatchWinner();
        setInningsBall({...inningsBall,second:0})
      }
      return;
    } else {
      // run added in his total and go to next ball

       let win = " Congrats! You WON the match. Lets rock the next round as well";
       let lost =
         " Sorry buddy! You Lost the match. try to win next round";    

      if (firstChoice == "bat") {
        let temp = yourScoreCard;
        if (pickedScore == null) {
          temp.push(0);

          setYourScoreCard(temp);
        } else {
          temp.push(pickedScore);
        };

        // checking whether he aleady reached the target score
        if (!firstInning) {
          let currentScore = temp.reduce((sum, n) => sum + n);
          if (currentScore >= target) {
            setRounds([...rounds, {r:"W",score:currentScore}]);
            setModalContent({
              desc: win,
              btn: "Continue to Next Round",
            });
            setShowMatchModal(true);
            return;
          }
        }
      } else {
        let temp1 = otherScoreCard;
        temp1.push(pickedByOtherPlayer);
        setOtherScoreCard(temp1);

          if (!firstInning) {
            let currentScore = temp1.reduce((sum, n) => sum + n);

            
            if (currentScore >= target) {
              setRounds([...rounds,{r:"L",score:currentScore}])
              setModalContent({
                desc: lost,
                btn: "Continue to Next Round",
              });
              setShowMatchModal(true);
              return
            }
          }
      }
    }

    // handle last ball of the inning

    if (inningsBall.first == 1 && firstInning) {
      // go to the next inning
      setFirstInning(false);
      goToNextInning();
      return;
    } else if (inningsBall.second == 1) {
      // calculate and cache the round winner and toss again for the next round (if its not last round)
      calcMatchWinner();
      return;
    }

    setTimeout(() => {
      if (timerEnds ) {
       
        setTimerRestarts(true);
        setPickedScore(null);
      }
    }, 3000);
  };

  let goToNextInning = () => {
    let temp;
    
    if (firstChoice == "bat") {
      temp = yourScoreCard;
      setFirstChoice("bowl");
    } else {
      temp = otherScoreCard;
      setFirstChoice("bat");
    }
    setTarget(temp.reduce((sum, n) => (sum + n),0)+1);
    setModalContent({
      desc: "First inning is over, continue to play the next inning of the match. ",
      btn: "Continue",
    });

    setTimeout(() => {
      setPickedScore(null);
      setShowMatchModal(true);
    }, 2000);
  };

  let calcMatchWinner = () => {
    let d;
    let win = " Congrats! You WON the match. Lets rock the next round as well";
    let lost = " Sorry buddy! You Lost the match.  try to win next round";
    let draw = "The Match ended as DRAW. Lets continue to next round"

    if (firstChoice == "bat") {

      // while chasing the target
      let yourTotal = yourScoreCard?.reduce((sum, n) => (sum + n),0);
      if (yourTotal >= target) {
        d = win;
        setRounds([...rounds,{r:"W",score:yourTotal}])
      } else if (yourTotal == target - 1) {
        d = draw;
        setRounds([...rounds, { r: "D", score: yourTotal }]);
      } else {
        d = lost
        setRounds([...rounds, { r: "L", score: yourTotal }]);
      }
    } else {
       
      // while defending the target
      let temp1 = otherScoreCard?.reduce((sum, n) => (sum + n),0);
      if (temp1 >= target) {
        d = lost
        setRounds([...rounds,  { r: "L", score: target-1 }]);
      } else if (temp1 == target - 1) {
        d = draw
        setRounds([...rounds, { r: "D", score: target - 1 }]);
      } else {
        d = win
        setRounds([...rounds, { r: "W", score: target - 1 }]);
      }
    }


    setModalContent({
      desc: d,
      btn:"Continue to Next Round"
    })
    setShowMatchModal(true)
    
  };

  return (
    <div style={{ minHeight: "85vh", marginTop: "1em" }}>
      <div>
        <p style={{ textAlign: "center", fontSize: "1.1em", color: "white" }}>
          Rounds
        </p>
        <div
          className="rounds"
          style={{ display: "flex", justifyContent: "center",color:"white" }}
        >
          <div
            
            style={{
              backgroundColor:
                rounds[0]?.r == "W" ? "green" : rounds[0]?.r == "L" ? "red" : "",
            
            }}
          >
            {rounds[0]?.r}
          </div>

          <div
            style={{
              backgroundColor:
                rounds[1]?.r == "W" ? "green" : rounds[1]?.r == "L" ? "red" : "",
            }}
          >
            {rounds[1]?.r}
          </div>
          <div
            style={{
              backgroundColor:
                rounds[2]?.r == "W" ? "green" : rounds[2]?.r == "L" ? "red" : "",
              
            }}
          >
            {rounds[2]?.r}
          </div>
        </div>
      </div>

      {showTarget && (
        <div style={{ margin: "0.5em", padding: "0.4em" }}>
          <p style={{ color: "pink", fontStyle: "italic" }}>
            Target Score :{" "}
            <span
              style={{
                fontSize: "1.2em",
                background: "pink",
                padding: "5px",
                borderRadius: "1em",
                color: "black",
              }}
            >
              {target}
            </span>
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1em",
        }}
      >
        <MemoizedUserProfile
          scoreCard={[...yourScoreCard]}
          action={firstChoice}
        />
        <MemoizedUserProfile player2="other" scoreCard={[...otherScoreCard]} />
      </div>
   
      <CounterComponent otherScore={otherScore} setTimerEnds={setTimerEnds} timerRestarts={timerRestarts} setTimerRestarts={setTimerRestarts} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "1em",
          justifyContent: "center",
        }}
      >
        {ScoreOptions.map((item, i) => (
          <div
            onClick={() => setPickedScore(Number(i + 1))}
            className="scoreCard"
            style={{
              background: pickedScore == i + 1 && "red",
              color: pickedScore == i + 1 && "white",
            }}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <MemoizedModal
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
        modalContent={modalContent}
        setShowTarget={setShowTarget}
        setTimerRestarts={setTimerRestarts}
        rounds={rounds}
      />

      <MemoizedRecommendation/>
    </div>
  );
};

let UserProfile = ({ player2, scoreCard, action }) => {
  
  return (
    <div style={{ maxWidth: "10em", margin: "0.5em" }}>
      <p>
        {player2 ? (
          "Opponent"
        ) : (
          <>
              You{" "}
              
            <span style={{ color: "wheat", fontSize: "1.1em",fontWeight:"bold" }}>
              {action == "bat" ? "(Batting)" : "(Bowling)"}
            </span>
          </>
        )}
      </p>
      <img
        style={{
          borderRadius: "50%",
          marginTop: "0.3em",
          height: "6em",
          width: "6em",
        }}
        src={player2 ? "/dummy-4.jpg" : "/dummyImg.jpg"}
        alt="user"
      />
      <div
        className="scoreBoard"
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {scoreCard.map((score, i) => (
          <div className={`${score == "W" && "bg-danger"}`} key={i}>
            {score}
          </div>
        ))}
      </div>
    </div>
  );
};

let MatchModal = ({
  showMatchModal,
  setShowMatchModal,
  modalContent,
  setShowTarget,
  setTimerRestarts,
  rounds
  
}) => {
  let NavigateTo = useNavigate();
  let dispatch = useDispatch();
  
  let result = {
    msg: "",
    emotion: "",
    W: 0,
    L: 0,
    D: 0,
  };
  if (rounds.length == 3) {
    rounds.map(({ r }) => {
      result[r] = result[r] + 1;
    });

    if (result["W"] > result["L"]) {
      // you won the game of three rounds of match
      result.msg = `Congratulations! You won the game of three rounds of match with ${result["W"]} wins out of 3`;
      result.emotion = "🥳🥳🥳";
    } else if (result["L"] > result["W"]) {
      // you lost the ultimate round-league match game
      result.msg = `Hard luck! you lost the game by losing ${result["L"]} out of 3 matches. Better luck next time.`;
      result.emotion = "😩😩😩";
    } else {
      // the series ended in draw
      result.msg = `Well Played Bro but the game ended in draw. Maybe next time its your time.`;
      result.emotion = "🫡🫡🫡🫡";
    }
  }

  return (
    <Modal
      show={showMatchModal}
      onHide={() => setShowMatchModal(false)}
      centered
      size={rounds.length == 3 ? "lg" : "sm"}
      backdrop="static"
    >
      <Modal.Body
        className={`rounded ${
          rounds.length == 3 ? "bg-black text-white" : "bg-warning"
        } `}
      >
        {rounds.length < 3 ? (
          <div>
            <p
              className={`${
                modalContent.btn != "Continue" && "text-primary fw-bold"
              }`}
            >
              {modalContent.desc}
            </p>
            <button
              onClick={() => {
                if (modalContent.btn == "Continue") {
                  setShowTarget(true);
                  setTimerRestarts(true);
                } else {
                  dispatch({
                    type: "rounds",
                    payload: rounds,
                  });
                  NavigateTo("/Toss");
                }
                setShowMatchModal(false);
              }}
              className="btn bg-dark text-white"
            >
              {modalContent.btn}
            </button>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="fs-2">{result.emotion}</p>
              <p className="fst-italic">{result.msg}</p>
              
              <div className="w-100 border my-2">
                <div className="d-flex text-info justify-content-around border-bottom m-1 mb-2">
                   <div>Round</div>
                <div>Runs scored</div>
                <div>Result</div>
                
                </div>
               
                   {rounds.map((stage, i) =>
                  <div key={i} className="d-flex justify-content-around align-items-center">
                    <p>{i+1}</p>
                    <p>{stage.score}</p>
                    <p>{stage.r}</p>
                   
                </div>)}
                
               
              </div>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-outline-warning border-2"
            >
              Restart Game
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

let CounterComponent = ({otherScore,setTimerEnds,timerRestarts,setTimerRestarts}) => {
  let [timer, setTimer] = useState(5);


   useEffect(() => {
     if (timer == 0) {
       setTimerEnds(true);
       return;
     }
     let interval = setInterval(() => {
       setTimer(timer - 1);
     }, 1000);

     return () => clearInterval(interval);
   }, [timer]);
  
  useEffect(() => {

      if (timerRestarts) {
        setTimer(5);
        setTimerRestarts(false);
      }

  },[timerRestarts])
  return (
    <div
      style={{
        background: "purple",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
      }}
    >
      <div style={{ height: "100%", textAlign: "center" }}>
        <p style={{ margin: "1em", color: "wheat", fontSize: "1.1em" }}>
          {" "}
          {timer > 0 ? (
            "Please choose a score before the timer gets up"
          ) : (
            <span
              style={{
                fontWeight: "bold",
                color: "White",
                fontStyle: "italic",
              }}
            >
              Opponent picked this Number
            </span>
          )}
        </p>

        <div
          style={{
            fontSize: "2em",
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 1em 1em",
          }}
        >
          {timer > 0 ? (
            timer
          ) : (
            <span style={{ color: "red" }}>{otherScore}</span>
          )}
        </div>
      </div>
    </div>
  );
}

let areEqual = (prevProps, newProps) => {

  if (prevProps.scoreCard?.length == newProps.scoreCard?.length ) {
    return true
  }
}

let MemoizedModal = React.memo(MatchModal);
let MemoizedUserProfile = React.memo(UserProfile,areEqual);
export default PlayGroundPage;
