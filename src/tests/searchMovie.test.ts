// import request from "supertest";
// import {StatusCodes} from "http-status-codes";
// import {createTestServer} from "../testServer";
//
// describe('Tests for endpoint to search a movie', () => {
//
//     const app = createTestServer();
//
//     it('responds with a random movie for no query params specified', async () => {
//         const response = await request(app)
//             .get('/search')
//             .send();
//
//         const data = response.body.data;
//
//         expect(response.status).toBe(StatusCodes.OK);
//         expect(data).toHaveProperty('id');
//         expect(data).toHaveProperty('title');
//         expect(data).toHaveProperty('runtime');
//         expect(data).toHaveProperty('director');
//         expect(data).toHaveProperty('genres');
//         expect(data).toHaveProperty('actors');
//         expect(data).toHaveProperty('plot');
//         expect(data).toHaveProperty('posterUrl');
//     });
//
//     it('responds with a random movie for only duration query param specified', async () => {
//         const response = await request(app)
//             .get('/search')
//             .query(
//                 {
//                     duration: 120
//                 }
//             )
//             .send();
//
//         const data = response.body.data;
//
//         expect(response.status).toBe(StatusCodes.OK);
//         expect(data).toHaveProperty('id');
//         expect(data).toHaveProperty('title');
//         expect(data).toHaveProperty('runtime');
//         expect(data).toHaveProperty('director');
//         expect(data).toHaveProperty('genres');
//         expect(data).toHaveProperty('actors');
//         expect(data).toHaveProperty('plot');
//         expect(data).toHaveProperty('posterUrl');
//     });
//
//     it('responds with a movies for only array of genres query param specified', async () => {
//         const genres = [
//             'Comedy',
//             'Adventure',
//             'Animation'
//         ];
//
//         const response = await request(app)
//             .get('/search')
//             .query(
//                 {
//                     genres
//                 }
//             )
//             .send();
//
//         const data = response.body.data;
//
//         const lastMovieOnAList = data[data.length - 1];
//         const lastMovieMatchingGenresCount = lastMovieOnAList.genres.filter((genre) => genres.includes(genre)).length;
//
//         expect(response.status).toBe(StatusCodes.OK);
//         expect(data.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
//         expect(data[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified
//         expect(lastMovieMatchingGenresCount).toBe(1); // We assume last movie has only one genre from given three
//     });
//
//     it('responds with a movies for array of genres and duration query params specified', async () => {
//         const genres = [
//             'Comedy',
//             'Adventure',
//             'Animation'
//         ];
//
//         const response = await request(app)
//             .get('/search')
//             .query(
//                 {
//                     genres,
//                     duration: 120,
//                 }
//             )
//             .send();
//
//         const data = response.body.data;
//
//         const lastMovieOnAList = data[data.length - 1];
//         const lastMovieMatchingGenresCount = lastMovieOnAList.genres.filter((genre) => genres.includes(genre)).length;
//
//         expect(response.status).toBe(StatusCodes.OK);
//         expect(data.length).toBeGreaterThan(0); // theoretically this can be 0 if DB will be empty or duration assumption will fail
//         expect(data[0].genres.length).toBe(3); // We assume we have movie with 3 genres that we've specified and it's first on a list
//         expect(lastMovieMatchingGenresCount).toBe(1); // We assume last movie has only one genre from given three
//     });
//
//     it('responds with a bad request for genres specified as a comma-separated string', async () => {
//         const response = await request(app)
//             .get('/search')
//             .query(
//                 {
//                     genres: 'Comedy, Action',
//                 }
//             )
//             .send();
//
//         expect(response.status).toBe(StatusCodes.BAD_REQUEST);
//     });
//
//     it('responds with an empty data if genres string and duration specified but no movies found for this query', async () => {
//         const response = await request(app)
//             .get('/search')
//             .query(
//                 {
//                     genres: 'Comedy', // also check non-array param here
//                     duration: 350,
//                 }
//             )
//             .send();
//
//         expect(response.status).toBe(StatusCodes.OK);
//         expect(response.body.data).toStrictEqual([]);
//     });
// });
