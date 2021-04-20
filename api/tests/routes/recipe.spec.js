/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, User, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  summary: 'milanesa a la napolitana'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Recipe.sync({ force: true }));

  describe('GET /recipe', () => {
    it('should get 200', () => {
      agent.post('/recipe').send(recipe)
      agent.get('/recipe').expect(200)
    });
  });
  describe('GET /recipe?name=xxx', () => {
    it('should get 200', () =>
      agent.get('/recipe?name=milanesa').expect(200)
    );
  });
  describe('GET /recipe/:recipeId', () => {
    it('should get 200', () =>
      agent.get('/recipe/716429').expect(200)
    );
  });
  describe('POST /recipe', () => {
    it('should get 200', () => {
      agent.post('/recipe').send({name: 'pasta', summary: 'pasta with pasta'}).expect(200) 
    })
  })
});

describe('Diets routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Diet.sync({ force: true }))
  describe('GET /diets', () => {
    it('should get 200', () => {
      agent.get('/types').expect(200)
    }
    ).timeout(4000)
  });
})

describe('User routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => User.sync({ force: true }));

  describe('GET /:id', () => {
    it('should get 200', () => {
      agent.post('/user/register').send({ name: 'Alexandra', email: 'email@email.com', password: 'password.123' })
      agent.get('/user/1').expect(200)
    }).timeout(20000);
  });

  describe('POST login', () => {
    it('should get 200', () => {
      agent.post('/user/register').send({ name: 'Alexandra', email: 'email@email.com', password: 'password.123' })
      agent.post('/user/logout')
      agent.post('user/login').send({ email: 'email@email.com', password: 'password.123' }).expect(200)
    });
    it('should return the user', () => {
      agent.post('/user/register').send({ name: 'Alexandra', email: 'email@email.com', password: 'password.123' })
      agent.post('/user/logout')
      agent.post('user/login').send({
        email: 'email@email.com',
        password: 'password.123'
      })
        .expect(200).expect((res => {
          (res.body).to.be.eql({
            id: 1,
            name: 'Alexandra Santiago',
            email: 'email@email.com',
            password: 'password.123'
          })
        }))
    });
  });

  describe('POST /logout', () => {
    it('should get 200', () => {
      agent.post('/user/register').send({ name: 'Alexandra', email: 'email@email.com', password: 'password.123' })
      agent.get('/user/logout').expect(200).expect((res) => (res.body).to.be.eql('log out succesful'))
    });
  });

  describe('POST /register', () => {
    it('should get 200 and return the user data', () => {
      agent.post('user/register').send({
        name: 'Matias',
        email: 'matias@email.com',
        password: 'password.123'
      }).expect(200).expect((res) => {
        expect(res.body).to.be.eql({
          id: 1,
          name: 'Matias',
          email: 'matias@email.com',
          password: 'password.123'
        })
      })})
  });
});