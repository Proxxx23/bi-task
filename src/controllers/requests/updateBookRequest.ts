import {RatingsRange} from "../../models/Book";

export type UpdateBookRequest = {
    title: string,
    isbn: string,
    author: string,
    pagesCount: number,
    rating: RatingsRange,
};
