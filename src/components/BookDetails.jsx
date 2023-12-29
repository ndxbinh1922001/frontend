import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentBook } from '../redux/bookSlice';
import { chapters } from '../utils/data';

const BookDetails = () => {
    const { bookId } = useParams();
    const dispatch = useDispatch()
    const { listBook } = useSelector(state => state.books)
    const [book, setBook] = useState(null)
    useEffect(() => {
        console.log('bookId', bookId)
        const book = listBook.find(book => `${book.id}` === `${bookId}`)
        dispatch(setCurrentBook(book))
        setBook(book)
    }, [])
    return book ? (
        <div className='bg-slate-300 w-screen min-h-screen h-min flex flex-rows'>
            <div className="w-1/4 flex flex-col justify-center items-center">
                <h1 className="text-center pb-[0px] font-semibold text-[20px] mb-[10px]">
                    {book.title}
                </h1>
                <img
                    className="rounded-[8px] w-4/5"
                    src={book.image}
                    alt=""
                />
                <i>{book.description}</i>
                <p className="item-price text-center pb-[0px] mt-[10px]">
                    {book.author}
                </p>
            </div>
            <div className="w-3/4">
                <div className="w-full lg:px-[124px] pb-4 pt-24 grid grid-cols-4 ">
                    {(chapters.length > 0 ? (chapters.map(chapter => (
                        <div key={chapter.id} className="flex flex-col mx-[10px] my-[5px]">
                            <div className="text-center font-semibold text-[16px] py-[10px]">{chapter.title}</div>
                            <div className={`w-full h-[150px] bg-[${chapter.color}] p-[5px]`}>
                                Characters: Mom, Tessa, Mrs. Smith Tessa moves...
                            </div>
                        </div>
                    ))) : <div className='text-green-500'>Empty</div>)}
                </div>
            </div>
        </div>
    ) : <p>Book not found.</p>;
}

export default BookDetails