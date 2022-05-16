import Book from "../database/models/Book";
import User from '../database/models/User'
import { bookPayload, modifBookPayload } from '../documents'

export async function addBook(userId : string, data : bookPayload){
    const book = await Book.create(data)
    const res = await User.updateOne({ _id : userId }, {$push : {books_owned : book._id}})
    return book
}

export async function delBook(userId : string, bookId : string){
    const book = await Book.findById(bookId, 'userId')
    if(book.userId != userId){throw new Error('ressource not accessible')}
    const res = await Book.deleteOne({ _id : bookId })
    await User.updateOne({ _id : userId }, { $pull : { books_owned : bookId } })
    return res
}

export async function modifBook(userId : string, book: modifBookPayload){
    const book_ = await Book.findById(book._id, 'userId')
    if(book_.userId !== userId){throw new Error('ressource not accessible')}
    const res = await Book.updateOne(
        {'_id' : book._id},
        {'$set' : {
            'title' : book.title,
            'author' : book.author,
            'release_year' : book.release_year,
            'notes' : book.notes}
        })
    return res
}