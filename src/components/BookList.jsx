import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axiosClient from '../services/api-client';
import { addBook, setBooks } from '../redux/bookSlice';
import Loading from './Loading';
import { searchBooks } from '../utils/searchBook';

const BookList = () => {
	const dispatch = useDispatch()
	const { listBook } = useSelector(state => state.books);
	const [showModalAddBook, setShowModalAddBook] = useState(false)
	const [newTitle, setNewTitle] = useState("")
	const [newImage, setNewImage] = useState("")
	const [newDescription, setNewDescription] = useState("")
	const [newAuthor, setNewAuthor] = useState("")
	const [isLoading, setLoading] = useState(false)
	const [newBook, setNewBook] = useState(null)
	const [books, setBooks] = useState([])
	const [searchParams, setSearchParams] = useState("")
	const createNewBook = async () => {
		if (newTitle === "") {
			toast.error("Missing title")
			setShowModalAddBook(false)
			return
		}
		if (newImage === "") {
			toast.error("Missing image")
			setShowModalAddBook(false)
			return
		}
		if (newDescription === "") {
			toast.error("Missing description")
			setShowModalAddBook(false)
			return
		}
		if (newAuthor === "") {
			toast.error("Missing author")
			setShowModalAddBook(false)
			return
		}
		let id = Date.now()
		let newBook = { id, title: newTitle, image: newImage, description: newDescription, author: newAuthor }
		// const res = await axiosClient.post("/api/book", newBook)
		dispatch(addBook(newBook))
		setNewBook(newBook)
		toast.success("Add new book successfully")
		setShowModalAddBook(false)
		setNewTitle("")
		setNewImage("")
		setNewDescription("")
		setNewAuthor("")
		setLoading(!isLoading)
	}
	const searchBook = async () => {
		setLoading(true)
		// code vào đây
		const bookSearched = searchBooks(listBook, searchParams)
		setBooks(bookSearched)
		setLoading(false)
	}
	const getListBook = async () => {
		// const res = await axiosClient.get("/api/book")
		// if (resizeBy.status === 200){
		// 	dispatch(setBooks(res.data))
		// }
	}
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			searchBook();
		}
	};
	useEffect(() => {
		setLoading(true)
		getListBook()
		setBooks(listBook)
		setLoading(false)
	}, [])
	useEffect(() => {
		setLoading(true)
		setBooks(listBook)
		setLoading(false)
	}, [listBook, newBook])
	return (
		<div className='relative min-h-screen w-full bg-slate-300'>
			{isLoading ? (<Loading />) : (
				<>
					<div className="Rectangle9 w-[300px] h-min bg-blue-500 rounded-3xl shadow flex flex-row py-[5px] absolute top-[20px] left-[10px] border-[2px] border-white" >
						<img className="w-[30px] h-[30px]" src="/images/Search.svg" />
						<input type='search' className="w-[250px] text-white text-[16px] px-[10px] font-semibold font-['Poppins'] bg-transparent placeholder:text-white" placeholder='Search for books...' value={searchParams} onChange={(e) => setSearchParams(e.target.value)} onKeyDown={handleKeyDown} />
					</div>

					<button onClick={() => setShowModalAddBook(true)} className='bg-blue-500 px-[20px] py-[10px] rounded-full border-[2px] hover:border-blue-500 hover:text-blue-500 text-white font-semibold hover:bg-white drop-shadow-xl right-[10px] absolute top-[20px]'>Add new book</button>
					<div className="w-full lg:px-[130px] pb-4 pt-24 grid grid-cols-4 ">
						{(books.length > 0 ? (books.map(book => (
							<Link to={`/book/${book.id}`} key={book.id}>
								<div className="mx-[10px] lg:col-span-1 overflow-hidden lg:row-span-1 relative rounded-sm shadow-md item hover:border-[#00dd53] transition duration-[.8] cursor-pointer ease-in-out hover:scale-[1.05]  hover:border-[1.6px] lg:h-[300px] my-[10px]">
									<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-[8px] bg-white flex-col">
										<img
											className="item-img rounded-[8px] mb-[15px]"
											src={book.image}
											alt=""
										/>
										<div className="item-title text-center pb-[0px]">
											<h1 className="font-semibold text-[20px] mb-[10px]">{book.title}</h1>
											<p className="item-price">
												{book.author}
											</p>
										</div>

										<div className="item-footer flex items-center justify-center mt-[10px]">
											<button className="btn btn-success">Read book</button>

										</div>
									</div>
								</div>
							</Link>
						))) : <div className='text-green-500'>Empty</div>)}
					</div>
					{showModalAddBook && (<div className="w-full min-h-full h-min bg-black bg-opacity-50 absolute top-0 left-0 flex justify-center items-center">
						<div className="w-2/5 min-h-3/5 h-min bg-white rounded-[10px]">
							<div className="w-full mt-[5px] px-[15px] pb-[15px] flex flex-col">
								<div className="text-black text-[26px] text-normal mb-[8px]">
									Add book
								</div>

								<input
									type="text"
									className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
									placeholder="Title"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
								<input
									type="text"
									className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
									placeholder="Image"
									value={newImage}
									onChange={(e) => setNewImage(e.target.value)}
								/>
								<textarea
									type="text"
									className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
									placeholder="Description"
									value={newDescription}
									onChange={(e) => setNewDescription(e.target.value)}
								/>
								<input
									type="text"
									className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
									placeholder="Author"
									value={newAuthor}
									onChange={(e) => setNewAuthor(e.target.value)}
								/>

							</div>
							<div className="w-full sticky bottom-0 bg-white z-[1000] flex flex-row-reverse px-[15px] justify-center items-center mb-[20px]">
								<button
									onClick={createNewBook}
									className="hover:bg-blue-500 hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-blue-500 border-blue-500  mx-[5px]"
								>
									Submit
								</button>
								<button
									onClick={() => setShowModalAddBook(false)}
									className="border-black border-[1px] rounded-[16px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#525252] bg-[#C2C2C2] mx-[5px] hover:border-[1px] hover:border-white hover:text-black"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>)}
				</>
			)}
		</div>
	);
}

export default BookList