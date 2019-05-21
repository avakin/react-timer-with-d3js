import * as Types from "../actions/actionsTypes";

const initialState = {
  start: false,
  pause: false,
  time: {
    minutes: 0,
    seconds: 0
  },
  fullDistance: 0,
  screen: "home",
  notification: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.START_TIMER:
      return {
        ...state,
        start: true,
        pause: false,
        time: {
          minutes: action.payload.minutes * 60 + action.payload.seconds,
          seconds: action.payload.seconds
        },
        fullDistance: action.payload.minutes * 60 + action.payload.seconds,
        screen: "in_progress"
      };
    case Types.CHANGE_TIMER:
      return {
        ...state,
        time: {
          minutes: action.payload.minutes,
          seconds: action.payload.seconds
        }
      };
    case Types.RESET_TIMER:
      return {
        ...state,
        screen: "home",
        start: false,
        time: {
          minutes: 0,
          seconds: 0
        },
        fullDistance: 0
      };
    case Types.PAUSE_TIMER:
      return {
        ...state,
        pause: true
      };
    case Types.FINISH_TIMER:
      return {
        ...state,
        screen: "finished",
        start: false,
        fullDistance: 0
      };
    case Types.RESUME_TIMER:
      return {
        ...state,
        pause: false
      };
    case Types.START_NEW_TIMER:
      return {
        ...state,
        screen: "home"
      };
    case Types.SETUP_NOTIFICATION_PERMISSION:
      return {
        ...state,
        notification: action.payload.val
      };
    default:
      return state;
  }
};
