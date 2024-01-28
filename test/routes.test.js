import {clearFakeDB, connectFakeDB, disconnectFakeDB} from "./initialzers/db.js";
import {app, server} from "./index.js";
import supertest from "supertest";
import {CREATE_POST_NAME, GET_POSTS_NAME} from "../src/const.js";

const request = supertest(app);

describe('routes', () => {
    beforeAll(async () => {
        await connectFakeDB();
    });
    afterAll(async () => {
        await disconnectFakeDB();
        await server.close()
    });
    beforeEach(async () => {
        await clearFakeDB()
    })


    describe('POST /posts', () => {
        it('check we succeed to post', async () => {
            const res = await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                user: 'dani'
            });
            expect(res.status).toBe(201);
        });
    });

    describe('GET /posts', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                user: 'shlomi'
            });
        })
        it('get regular', async () => {
            const res = await request.get('/posts')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3)
            expect(res.body[0].title).toBe('number 3')
        });
        it('index and limit', async () => {
            const res = await request.get('/posts').query({limit: 2, start: 1})
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2)
            expect(res.body[0].title).toBe('number 2')
        })
    })

    describe('GET /postsnumber', () => {
        it('example request using a mocked database instance', async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                user: 'shlomi'
            });
            const res = await request.get('/postsnumber')
            expect(res.status).toBe(200);
            expect(res.body.postsNumber).toBe(3)
        });
    });

    describe('GET statistics/topcreators', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                user: 'shlomi'
            });
        })
        it('test', async () => {
            const res = await request.get('/statistics/topcreators')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2)
            expect(res.body[0]).toEqual({name: 'dani', postsCounts: 2})
            expect(res.body[1]).toEqual({name: 'shlomi', postsCounts: 1})
        });
    })

    describe('GET statistics/runtimes', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                user: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                user: 'dani'
            });
            await request.get('/posts')

            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                user: 'shlomi'
            });

        })

        it('run time', async () => {
            const res = await request.get('/statistics/runtimes')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2)
            expect(res.body[0].name).toEqual(CREATE_POST_NAME)
            expect(res.body[1].name).toEqual(GET_POSTS_NAME)
        });
    })

});
