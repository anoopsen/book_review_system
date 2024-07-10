import { Review } from "./reviewInterfaces";

// src/graphql/schema/interfaces.ts
export interface Book {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
    reviews?: Review[];
  }
  