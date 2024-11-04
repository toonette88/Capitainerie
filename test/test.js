import { expect } from 'chai';
import chai from 'chai';
import { request } from 'chai-http';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const app = require('../app');
const userService = require('../src/services/userService');
const catwayService = require('../src/services/catwayService');
const reservationService = require('../src/services/reservationService');


describe('GET/users', function() {
    it('should return code 200 for /users', done => {
        request('http://example.com')
        .get('/users')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('Array');
            done();
        });   
    });
});

