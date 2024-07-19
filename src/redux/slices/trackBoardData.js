import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  boardData: [],
  columnData:{} ,
  itemName:''
};

export const productSlice = createSlice({
  name: 'productsFromEditor',
  initialState,
  reducers: {
    // to add new product
    setTrackBoardData(state, action) {
      const tempObj = [];
      tempObj.push(action.payload);
      state.boardData = tempObj;
    },
    setColumnData(state , action){
      state.columnData = action.payload;
    } ,
    setNameOfItem(state , action){
        state.itemName = action.payload
    }

  },
});

export const {
    setTrackBoardData,
    setColumnData ,
    setNameOfItem
  
} = productSlice.actions;
export default productSlice.reducer;
