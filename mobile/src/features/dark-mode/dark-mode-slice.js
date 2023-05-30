import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer