import {createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';

export interface IState {
  id: string;
  date: Date;
  name: string;
  avatar: string;
  city: string;
  address: string;
  phone: string;
  target?: boolean;
  [key: string]: string;
}

const initialState: {users: IState[]} = {
  users: [],
};

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addUsers: (state, {payload: arr}) => {
      state.users = [...arr, ...state.users];
    },
    choiceUser: (state, {payload: el}) => {
      state.users.map((elUser: IState) => {
        if (el.id === elUser.id) {
          elUser.target =
            elUser.target === undefined
              ? true
              : (elUser.target = elUser.target === true ? false : true);
        }
        return elUser;
      });
    },
  },
});

export const {addUsers, choiceUser} = stateSlice.actions;

export default stateSlice.reducer;
