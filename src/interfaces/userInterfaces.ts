import { Review } from "./reviewInterfaces";

export interface User {
    id: number;
    username: string;
    email: string;
    reviews?: Review[];
  }