# Book Review System

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up the database:

    ```bash
    npx prisma migrate dev --name init
    ```

3. Start the server:

    ```bash
    npx ts-node src/app.ts
    ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret key for JWT.

## API Documentation

### Queries

- `getBooks`: Fetch all books.
- `getBook(id: ID!)`: Fetch a single book by ID.
- `getReviews(bookId: ID!)`: Fetch reviews for a book.
- `getMyReviews`: Fetch reviews written by the authenticated user.

### Mutations

- `register(username: String!, email: String!, password: String!)`: Register a new user.
- `login(email: String!, password: String!)`: Login a user and get a JWT.
- `addBook(title: String!, author: String!, publishedYear: Int!)`: Add a new book.
- `addReview(bookId: ID!, rating: Int!, comment: String!)`: Add a review for a book.
- `updateReview(reviewId: ID!, rating: Int, comment: String)`: Update a review.
- `deleteReview(reviewId: ID!)`: Delete a review.

## Testing

Run tests using:

```bash
npm test
