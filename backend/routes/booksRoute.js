import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// POST request to create a new book (Create)
router.post('/', async (request, response) => {
    try {
        // Check if all required fields are provided
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Select all required fields: title, author, publishYear',
            });
        }
        // Create a new book object
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        // Save the new book to the database
        const book = await Book.create(newBook);
        // Return the created book
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET request to fetch all books (Read)
router.get('/', async (request, response) => {
    try {
        // Find all books in the database
        const books = await Book.find({});
        // Return the list of books
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// GET request to fetch a specific book by ID (Read)
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Find a book by its ID
        const book = await Book.findById(id);
        // Return the book
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// PUT request to update a book by ID (Update)
router.put('/:id', async (request, response) => {
    try {
        // Check if all required fields are provided
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Select all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;
        // Update the book by its ID
        const result = await Book.findByIdAndUpdate(id, request.body);
        // If the book is not found, return 404
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        // Return success message
        return response.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// DELETE request to delete a book by ID (Delete)
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Delete the book by its ID
        const result = await Book.findByIdAndDelete(id);
        // If the book is not found, return 404
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        // Return success message
        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;