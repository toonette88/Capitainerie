const sinon = require('sinon');
const assert = require('assert');
const reservationController = require('../src/services/reservations'); // Chemin vers votre contrôleur
const Reservation = require('../src/models/reservation');

describe('Reservation Service', () => {
    let res;

    beforeEach(() => {
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore(); // Restore all stubs after each test
    });

      describe('getAllReservations', () => {
            it('should return all reservations', async () => {
              const mockReservations = [{ catwayNumber: 1, clientName: 'John Doe' }];
              sinon.stub(Reservation, 'find').resolves(mockReservations);
        
              await reservationController.getAllReservations({}, res);
        
              assert.strictEqual(res.status.calledWith(200), true);
              assert.strictEqual(res.json.calledWith({ data: mockReservations }), true);
            });
        
            it('should handle database errors', async () => {
              const mockError = new Error('Database error');
              sinon.stub(Reservation, 'find').rejects(mockError);
          
              await reservationController.getAllReservations({}, res);
          
              assert.strictEqual(res.status.calledWith(500), true);
              assert.ok(res.json.calledWithMatch({ message: 'Database error' })); // Corrigez ici
            });
          });
        

    describe('getById', () => {
        it('should return a reservation by id', async () => {
            const mockReservation = { catwayNumber: 1, clientName: 'John Doe' };
            sinon.stub(Reservation, 'findById').resolves(mockReservation);
            const req = { params: { id: '12345' } };

            await reservationController.getById(req, res);

            assert.strictEqual(res.status.calledWith(200), true);
            assert.strictEqual(res.json.calledWith(mockReservation), true);
        });

        it('should return 404 if reservation not found', async () => {
            sinon.stub(Reservation, 'findById').resolves(null);
            const req = { params: { id: '12345' } };

            await reservationController.getById(req, res);

            assert.strictEqual(res.status.calledWith(404), true);
            assert.strictEqual(res.json.calledWith('reservation_not_found'), true);
        });

        it('should handle errors', async () => {
            sinon.stub(Reservation, 'findById').rejects(new Error('Error fetching reservation'));
            const req = { params: { id: '12345' } };

            await reservationController.getById(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });

    describe('add', () => {
        it('should create a new reservation', async () => {
            const mockReservation = { catwayNumber: 1, clientName: 'John Doe' };
            sinon.stub(Reservation, 'create').resolves(mockReservation);
            const req = {
                body: {
                    catwayNumber: 1,
                    clientName: 'John Doe',
                    boatName: 'Boat A',
                    checkIn: '2023-01-01',
                    checkOut: '2023-01-02',
                },
            };

            await reservationController.add(req, res);

            assert.strictEqual(res.status.calledWith(201), true);
            assert.strictEqual(res.json.calledWith(mockReservation), true);
        });

        it('should handle errors during creation', async () => {
            sinon.stub(Reservation, 'create').rejects(new Error('Error creating reservation'));
            const req = {
                body: {
                    catwayNumber: 1,
                    clientName: 'John Doe',
                    boatName: 'Boat A',
                    checkIn: '2023-01-01',
                    checkOut: '2023-01-02',
                },
            };

            await reservationController.add(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });

    describe('delete', () => {
        it('should delete a reservation', async () => {
            sinon.stub(Reservation, 'deleteOne').resolves({});
            const req = { params: { id: '12345' } };

            await reservationController.delete(req, res);

            assert.strictEqual(res.status.calledWith(204), true);
            assert.strictEqual(res.json.calledWith({ message: 'Reservation supprimé' }), true);
        });

        it('should handle errors during deletion', async () => {
            sinon.stub(Reservation, 'deleteOne').rejects(new Error('Error deleting reservation'));
            const req = { params: { id: '12345' } };

            await reservationController.delete(req, res);

            assert.strictEqual(res.status.calledWith(501), true);
        });
    });
});
