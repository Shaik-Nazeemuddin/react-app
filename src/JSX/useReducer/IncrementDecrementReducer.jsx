import ACTIONS from "./ACTIONS";
import initialState from "./initialState";

const IncrementDecrementReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT: 
            return { count: state.count + 1};
        case ACTIONS.DECREMENT:
            return { count: state.count - 1};
        case ACTIONS.RESET:
            return initialState;
        default:
            return state;
    }
}

export default IncrementDecrementReducer;