import { combineReducers } from "redux";

let init = {
    decision: "",
    parts:[]
}

let BattingBowlingDecision = (state = init, action) => {
    switch (action.type) {
        case "decision":
            let t = action.decision;    
            return { ...state, decision: t };
        
        case "rounds":
            let payload = action.payload;
            return {...state,parts:payload}
        default:
            return state;
    }
}

let rootReducer = combineReducers({
    tossResult:BattingBowlingDecision
})

export default rootReducer