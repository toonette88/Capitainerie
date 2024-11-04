const sinon = require('sinon');
const { strict: assert } = require('assert');
const userService = require('../src/services/users'); 
const User = require('../src/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
    header: sinon.stub(),
};

describe('User Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const req = {};
            const users = [{ name: 'John Doe', email: 'john@example.com' }];
            sinon.stub(User, 'find').resolves(users);

            await userService.getAllUsers(req, res);

            assert.strictEqual(res.status.calledWith(200), true);
            assert.strictEqual(res.json.calledWith({ data: users }), true);
        });

        it('should return 500 if there is a database error', async () => {
            const req = {};
            sinon.stub(User, 'find').rejects(new Error('Database Error'));

            await userService.getAllUsers(req, res);

            assert.strictEqual(res.status.calledWith(500), true);
        });
    });

    describe('getById', () => {
        it('should return a user by id', async () => {
            const req = { params: { id: '123' } };
            const user = { _id: '123', name: 'John Doe', email: 'john@example.com' };
            sinon.stub(User, 'findOne').resolves(user);

            await userService.getById(req, res);

            assert.strictEqual(res.status.calledWith(200), true);
            assert.strictEqual(res.json.calledWith(user), true);
        });

        it('should return 404 if user not found', async () => {
            const req = { params: { id: 'nonexistent' } };
            sinon.stub(User, 'findOne').resolves(null);

            await userService.getById(req, res);

            assert.strictEqual(res.status.calledWith(404), true);
            assert.strictEqual(res.json.calledWith('user_not_found'), true);
        });

        it('should return 501 if there is a server error', async () => {
            const req = { params: { id: '123' } };
            sinon.stub(User, 'findOne').rejects(new Error('Database Error'));

            await userService.getById(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });

    describe('add', () => {
        it('should create a new user', async () => {
            const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password' } };
            sinon.stub(User, 'create').resolves();

            await userService.add(req, res);

            assert.strictEqual(res.status.calledWith(201), true);
            assert.strictEqual(res.json.calledWith({ message: 'Utilisateur créé' }), true);
        });

        it('should return 501 if there is a database error', async () => {
            const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password' } };
            sinon.stub(User, 'create').rejects(new Error('Database Error'));

            await userService.add(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            const req = { params: { id: '123' }, body: { name: 'Jane Doe' } };
            const user = { _id: '123', name: 'John Doe', email: 'john@example.com', save: sinon.stub().resolves() };
            sinon.stub(User, 'findOne').resolves(user);

            await userService.update(req, res);

            assert.strictEqual(res.status.calledWith(201), true);
            assert.strictEqual(res.json.calledWith({ message: 'Utilisateur modifié' }), true);
        });

        it('should return 404 if user not found', async () => {
            const req = { params: { id: 'nonexistent' }, body: {} };
            sinon.stub(User, 'findOne').resolves(null);

            await userService.update(req, res);

            assert.strictEqual(res.status.calledWith(404), true);
            assert.strictEqual(res.json.calledWith('user_not_found'), true);
        });

        it('should return 501 if there is a server error', async () => {
            const req = { params: { id: '123' }, body: {} };
            sinon.stub(User, 'findOne').rejects(new Error('Database Error'));

            await userService.update(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });

    describe('delete', () => {
        it('should delete an existing user', async () => {
            const req = { params: { id: '123' } };
            sinon.stub(User, 'deleteOne').resolves();

            await userService.delete(req, res);

            assert.strictEqual(res.status.calledWith(204), true);
        });

        it('should return 501 if there is a server error', async () => {
            const req = { params: { id: '123' } };
            sinon.stub(User, 'deleteOne').rejects(new Error('Database Error'));

            await userService.delete(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });
});
