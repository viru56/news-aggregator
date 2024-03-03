import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BackdropState {
  open: boolean
}

const initialState: BackdropState = {
  open: false,
};


export const backdropSlice = createSlice({
  name: 'backdrop',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showBackdrop: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { showBackdrop } = backdropSlice.actions;

export default backdropSlice.reducer;
