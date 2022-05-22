import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'Candidate' },
  { id: '1', name: 'Recruiter' },
  { id: '2', name: "Company's Ceo" },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
