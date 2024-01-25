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
        server.close()
    });
    beforeEach(async () => {
        await clearFakeDB()
    })


    describe('POST /posts', () => {
        it('check we succeed to post', async () => {
            const res = await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                owner: 'dani'
            });
            expect(res.status).toBe(200);
        });
    });

    describe('GET /posts', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                owner: 'shlomi'
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
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                owner: 'shlomi'
            });
            const res = await request.get('/postsnumber')
            expect(res.status).toBe(200);
            expect(res.body.amount).toBe(3)
        });
    });

    describe('GET statistics/topcreators', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                owner: 'shlomi'
            });
        })
        it('test', async () => {
            const res = await request.get('/statistics/topcreators')
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2)
            expect(res.body[0]).toEqual({owner: 'dani', count: 2})
            expect(res.body[1]).toEqual({owner: 'shlomi', count: 1})
        });
    })

    describe('GET statistics/runtimes', () => {
        beforeEach(async () => {
            await request.post('/posts').send({
                title: 'number 1',
                body: 'body 1',
                owner: 'dani'
            });
            await request.post('/posts').send({
                title: 'number 2',
                body: 'body 2',
                owner: 'dani'
            });
            await request.get('/posts')

            await request.post('/posts').send({
                title: 'number 3',
                body: 'body 3',
                owner: 'shlomi'
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
