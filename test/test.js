const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

const userService = require('../src/services/users');
const catwayService = require('../src/services/catways');
const reservationService = require('../src/services/reservations')


describe('User Service', function() {
    describe('getAllUsers', function() {
        it('should return all users', async function() {
            const req = {};
            const res = {
                status: function (code){
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function(data) {
                    assert(Array.isArray(data));
                }
            };
            await userService.getAllUsers(req, res);
        });
    });

    describe('add', function() {
        it('should add a new user', async function(){
            const req = {
                body: {
                    name: 'Alex Terrieur',
                    email: 'alex@xxx.com',
                    password: '1234'
                }
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, 'Utilisateur créé')
                }
            };
            await userService.add(req,res);
        });
    });

    describe('update', function() {
        it('should update user', async function (){
            const req = {
                params: {id: 'ID_DU_USER_A_TESTER'},
                body: {
                    name:'Ines Péré',
                    email: 'ines@xxx.com',
                    password: '12345'
                }
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Utilisateur modifié');
                }
            };
            await userService.update(req, res);
        });
    });

    describe('delete', function() {
        it('should delete user', async function() {
            const req = {
                params: {id: 'ID_DU_USER_A_TESTER'},
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 204);
                    return this;
                },
                json: function(data){
                    assert.strictEqual(data.message, 'Utilisateur supprimé')
                }
            }
        })
    })
})


describe('Catway Service', function() {
    describe('getAllCatways', function() {
        it('should return all catways', async function(){
            const req = {};
            const res = {
                status: function (code){
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function (data) {
                    assert(Array.isArray(data));
                }
            };
            await catwayService.getAllCatways(req,res);
        });
    });

    describe('add', function() {
        it('should add a new catway', async function(){
            const req = {
                body: {
                    catwayNumber: '100',
                    type: 'long',
                    catwayState: 'bon état',
                }
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function(data) {
                    assert.strictEqual(data.message, 'Catway enregistré')
                }
            };
            await catwayService.add(req,res);
        });
    });

    describe('update', function () {
        it('should update catway', async function () {
            const req = {
                params: {id: 'ID_DU_CATWAY-A_TESTER'},
                body:{
                    catwayNumber:'10',
                    type:'short',
                    catwayState: 'bon état'
                }
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 201);
                    return this;
                },
                json: function(data){
                    assert.strictEqual(data.message, 'Catway modifié');
                }
            };
            await catwayService.update(req, res);
        });
    });    

    describe('delete', function() {
        it('should delete catway', async function () {
            const req = {
                params: {id: 'ID_DU_CATWAY_A_TESTER'}
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 204);
                    return this;
                },
                json: function (data) {
                    assert.strictEqual(data.message, 'Catway supprimé');
                }
            };
            await catwayService.delete(req, res);
        });
    });
});

describe('Reservation Service', function() {
    describe('getAllReservations', function() {
        it('should return all reservations', async function() {
            const req = {};
            const res = {
                status: function (code){
                    assert.strictEqual(code, 200);
                    return this;
                },
                json: function(data) {
                    assert(Array.isArray(data));
                }
            };
            await reservationService.getAllReservations(req,res);
        });
    });

    describe('add', function() {
        it('should add a new reservation', async function(){
            const req = {
                body: {
                    catwayNumber: '100',
                    clientName: 'John Doe',
                    boatName: 'La Méduse',
                    checkIn: '20/01/2025',
                    checkOut: '20/01/2026'
                }
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 201);
                    return this;
                },
            };
            await reservationService.add(req, res);
        });
    });

    describe('delete', function(){
        it('should delete reservation', async function(){
            const req = {
                params: {id: 'ID_DE_LA_RESERVATION_A_TESTER'}
            };
            const res = {
                status: function(code){
                    assert.strictEqual(code, 204);
                    return this;
                },
                json: function(data){
                    assert.strictEqual(data.message, 'Reservation supprimé');
                }
            };
            await reservationService.delete(req,res);
        });
    });
});
