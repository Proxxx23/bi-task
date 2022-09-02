import type {RatingsRange} from "../../models/Book";

export type CreateBookRequest = {
    title: string,
    isbn: string,
    author: string,
    pagesCount: number,
    rating: RatingsRange,
}
