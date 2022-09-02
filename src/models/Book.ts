export type RatingsRange = [1, 2, 3, 4, 5];

export class Book {
    constructor(
        public readonly title: string,
        public readonly isbn: string,
        public readonly author: string,
        public readonly pagesCount: number,
        public readonly rating: RatingsRange,
    ) {
    }
}
