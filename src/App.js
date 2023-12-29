import './App.css';
import { Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import React from 'react';

function App() {
	return (
		<Routes>
			<Route path="/" exact element={<BookList />} />
			<Route path="/book/:bookId" element={<BookDetails />} />
		</Routes>
	);
}

export default App;
