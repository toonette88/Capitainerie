const sinon = require('sinon');
const assert = require('assert');
const Catway = require('../src/models/catway'); 
const catwayService = require('../src/services/catways'); 

describe('Catway Service', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore(); // Restore all stubs after each test
    });

    describe('getAllCatways', () => {
        it('should return all catways', async () => {
            const catways = [{ catwayNumber: '123' }, { catwayNumber: '456' }];
            sinon.stub(Catway, 'find').resolves(catways);

            await catwayService.getAllCatways(req, res);

            assert.strictEqual(res.status.calledWith(200), true);
            assert.strictEqual(res.json.calledWith({ data: catways }), true);
        });

        it('should return an error if database fails', async () => {
            sinon.stub(Catway, 'find').rejects(new Error('Database Error'));

            await catwayService.getAllCatways(req, res);

            assert.strictEqual(res.status.calledWith(500), true);
            assert.strictEqual(res.json.calledWith({ message: 'Database Error', error: sinon.match.instanceOf(Error) }), true);
        });
    });

    describe('getById', () => {
        it('should return a catway by id', async () => {
            req.params.id = '123';
            const catway = { catwayNumber: '123' };
            sinon.stub(Catway, 'findOne').resolves(catway);

            await catwayService.getById(req, res);

            assert.strictEqual(res.status.calledWith(200), true);
            assert.strictEqual(res.json.calledWith(catway), true);
        });

        it('should return 404 if catway not found', async () => {
            req.params.id = '123';
            sinon.stub(Catway, 'findOne').resolves(null);

            await catwayService.getById(req, res);

            assert.strictEqual(res.status.calledWith(404), true);
            assert.strictEqual(res.json.calledWith('catway_not_found'), true);
        });

        it('should return 501 if there is a database error', async () => {
            req.params.id = '123';
            sinon.stub(Catway, 'findOne').rejects(new Error('Database Error'));

            await catwayService.getById(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
            assert.strictEqual(res.json.calledWith(sinon.match.instanceOf(Error)), true);
        });
    });

    describe('add', () => {
        it('should create a new catway', async () => {
            req.body = {
                catwayNumber: '123',
                type: 'example',
                catwayState: 'active',
                checkIn: '2024-01-01T10:00:00Z',
                checkOut: '2024-01-02T10:00:00Z'
            };
            sinon.stub(Catway, 'create').resolves();
    
            await catwayService.add(req, res);
    
            assert.strictEqual(res.status.calledWith(201), true);
            assert.strictEqual(res.json.calledWith({ message: 'Catway enregistré' }), true);
        });
    
        it('should return 501 if there is a database error', async () => {
            req.body = {
                catwayNumber: '123',
                type: 'example',
                catwayState: 'active'
            };
            const error = new Error('Database Error');
            sinon.stub(Catway, 'create').rejects(error);
        
            await catwayService.add(req, res);
        
            assert.strictEqual(res.status.calledWith(501), true);
            assert.strictEqual(res.json.calledWith({ error }), true); // Vérifiez l'objet retourné
        });
        
    });

    describe('update', () => {
        it('should update an existing catway', async () => {
            req.params.id = '123';
            req.body = {
                catwayNumber: '456',
                type: 'updated',
                catwayState: 'inactive'
            };
            const catway = { catwayNumber: '123', save: sinon.stub().resolves() };
            sinon.stub(Catway, 'findOne').resolves(catway);

            await catwayService.update(req, res);

            assert.strictEqual(res.status.calledWith(201), true);
            assert.strictEqual(res.json.calledWith({ message: 'Catway modifié' }), true);
        });

        it('should return 404 if catway not found', async () => {
            req.params.id = '123';
            req.body = { catwayNumber: '456' };
            sinon.stub(Catway, 'findOne').resolves(null);

            await catwayService.update(req, res);

            assert.strictEqual(res.status.calledWith(404), true);
            assert.strictEqual(res.json.calledWith('catway_not_found'), true);
        });

        it('should return 501 if there is a database error', async () => {
            req.params.id = '123';
            req.body = { catwayNumber: '456' };
            sinon.stub(Catway, 'findOne').rejects(new Error('Database Error'));

            await catwayService.update(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
            assert.strictEqual(res.json.calledWith(sinon.match.instanceOf(Error)), true);
        });
    });

    describe('delete', () => {
        it('should delete an existing catway', async () => {
            req.params.id = '123';
            sinon.stub(Catway, 'deleteOne').resolves();
    
            await catwayService.delete(req, res);
    
            assert.strictEqual(res.status.calledWith(204), true);
        });
    
        it('should return 501 if there is a database error', async () => {
            req.params.id = '123';
            const error = new Error('Database Error');
            sinon.stub(Catway, 'deleteOne').rejects(error);
    
            await catwayService.delete(req, res);
    
            assert.strictEqual(res.status.calledWith(501), true);
            assert.strictEqual(res.json.calledWith(sinon.match.instanceOf(Error)), true);
        });
    });
});