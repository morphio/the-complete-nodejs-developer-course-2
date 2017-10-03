/**
 * File    : server.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 3/10/2017
 */
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// beforeEach(), describe() and it() come from Mocha!
// insertMany() comme from Mongoose.

const todos =[{
    text: 'First test todo',
    }, {
    text: 'Second test todo'
    }];

// beforeEach() will automatically execute before EACH test case
beforeEach((done) => {
   Todo.remove({}).then(() => {
       return Todo.insertMany(todos)
   }).then(() => done());
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err){
                    // return here, just stop the execution of continuing
                    return done(err);
                }

                // here we make the assumption that the DB is initially empty
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})//pass here, invalid data
            .expect(400)
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                //check the DB
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

});


describe('GET /todos', () => {
   it('should get all todos', (done) => {
       request(app)
           .get('/todos')
           .expect(200)
           .expect((res) => {
                expect(res.body.todos.length).toBe(2);
           })
           .end(done);
   });
});