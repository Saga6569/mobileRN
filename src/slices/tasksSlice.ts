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
  description?: string;
  [key: string]: string | undefined | Date | boolean;
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
    setDescription: (state, {payload: {value, key, id}}) => {
      state.users.map((elUser: IState) => {
        if (id === elUser.id) {
          elUser[key] = value;
        }
        return elUser;
      });
    },
  },
});

export const {addUsers, choiceUser, setDescription} = stateSlice.actions;

export default stateSlice.reducer;
