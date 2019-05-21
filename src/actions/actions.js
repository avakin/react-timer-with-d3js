import * as Types from "./actionsTypes";

export const startTimer = ({ minutes, seconds }) => ({
  type: Types.START_TIMER,
  payload: { minutes, seconds }
});

export const resetTimer = () => ({
  type: Types.RESET_TIMER
});

export const changeTimer = ({ minutes, seconds }) => ({
  type: Types.CHANGE_TIMER,
  payload: { minutes, seconds }
});

export const pauseTimer = () => ({
  type: Types.PAUSE_TIMER
});

export const finishTimer = () => ({
  type: Types.FINISH_TIMER
});

export const startNewTimer = () => ({
  type: Types.START_NEW_TIMER
});

export const resumeTimer = () => ({
  type: Types.RESUME_TIMER
});
