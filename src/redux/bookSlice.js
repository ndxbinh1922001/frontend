import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listBook: [],
    currentBook: null
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => { state.listBook = action.payload },
        addBook: (state, action) => { state.listBook.push(action.payload) },
        setCurrentBook: (state, action) => { state.currentBook = action.payload }
    }
});

export const { setBooks, addBook, setCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;
