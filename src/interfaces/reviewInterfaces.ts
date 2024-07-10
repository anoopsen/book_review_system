import { Book } from "./bookInterfaces";
import { User } from "./userInterfaces";

// src/graphql/schema/interfaces.ts
export interface Review {
    id: number;
    userId: number;
    bookId: number;
    rating: number;
    comment: string;
    createdAt: string;
    user?: User;
    book?: Book;
  }
  