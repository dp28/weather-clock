import { createSlice } from "@reduxjs/toolkit";
import { loadLightsIfExpired } from "../innerRing/innerRingSlice";

export const clockSlice = createSlice({
  name: "clock",
  initialState: {
    time: parseTime(new Date()),
  },
  reducers: {
    tick: (state) => {
      state.time = parseTime(new Date());
    },
  },
});

export const { tick } = clockSlice.actions;

export const clockReducer = clockSlice.reducer;

export const selectClockTime = (state) => state.clock.time;

export const startClock = () => (dispatch) => {
  setInterval(() => {
    dispatch(tick());
    dispatch(loadLightsIfExpired());
  }, 1000);
};

function parseTime(date) {
  return {
    hours: date.getHours() % 12,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}
