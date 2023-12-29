import { removeVietnameseTones } from "./removeVietnameseTones";

export const searchBooks = (books, searchTerm) => {
    const normalizedSearchTerm = removeVietnameseTones(searchTerm.toLowerCase());

    return books.filter(book => {
        const title = removeVietnameseTones(book.title.toLowerCase());
        const description = removeVietnameseTones(book.description.toLowerCase());
        const author = removeVietnameseTones(book.author.toLowerCase());
        return title.includes(normalizedSearchTerm) ||
            description.includes(normalizedSearchTerm) ||
            author.includes(normalizedSearchTerm);
    });
}