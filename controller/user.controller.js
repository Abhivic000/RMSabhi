const db = require('../model/db.model');

// exports.getSeatAvailability = (req, res) => {
//     const { source, destination } = req.body;
//     db.query(
//         'SELECT * FROM trains WHERE source = ? AND destination = ?',
//         [source, destination],
//         (err, results) => {
//             if (err) return res.status(500).json({ error: 'Failed to fetch trains' });
//             res.json(results);
//         }
//     );
// };

// exports.bookSeat = (req, res) => {
//     const { trainId } = req.body;
//     const userId = req.userId;
//     db.getConnection((err, connection) => {
//         if (err) return res.status(500).json({ error: 'Database connection error' });

//         connection.beginTransaction((err) => {
//             if (err) return res.status(500).json({ error: 'Transaction failed' });

//             connection.query('SELECT availableSeats FROM trains WHERE id = ?', [trainId], (err, results) => {
//                 if (err || results.length === 0 || results[0].availableSeats <= 0) {
//                     return connection.rollback(() => {
//                         res.status(400).json({ error: 'No seats available' });
//                     });
//                 }
//                 const availableSeats = results[0].availableSeats - 1;
//                 connection.query('UPDATE trains SET availableSeats = ? WHERE id = ?', [availableSeats, trainId], (err) => {
//                     if (err) {
//                         return connection.rollback(() => {
//                             res.status(500).json({ error: 'Failed to update seats' });
//                         });
//                     }
//                     connection.query('INSERT INTO bookings (userId, trainId) VALUES (?, ?)', [userId, trainId], (err) => {
//                         if (err) {
//                             return connection.rollback(() => {
//                                 res.status(500).json({ error: 'Failed to book seat' });
//                             });
//                         }

//                         connection.commit((err) => {
//                             if (err) return res.status(500).json({ error: 'Commit failed' });
//                             res.status(201).json({ message: 'Seat booked successfully' });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// };

// exports.getBookingDetails = (req, res) => {
//     const userId = req.userId;
//     db.query('SELECT * FROM bookings WHERE userId = ?', [userId], (err, results) => {
//         if (err) return res.status(500).json({ error: 'Failed to fetch booking details' });
//         res.json(results);
//     });
// };


const getBookingDetails = async (req, res) => {
    const userId = req.userId;
    db.query('SELECT * FROM bookings WHERE userId = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch booking details' });
        res.json(results);
    });
}

const bookSeat = async (req, res) => {
    const { trainId } = req.body;
    const userId = req.userId;
    db.getConnection((err, connection) => {
        if (err) { return res.status(500).json({ error: 'Database connection error' }) };

        connection.beginTransaction((err) => {
            if (err) {return res.status(500).json({ error: 'Transaction failed' })};

            connection.query('SELECT availableSeats FROM trains WHERE id = ?', [trainId], (err, results) => {
                if (err || results.length === 0 || results[0].availableSeats <= 0) {
                    return connection.rollback(() => {
                        res.status(400).json({ error: 'No seats available' });
                    });
                }
                const availableSeats = results[0].availableSeats - 1;
                connection.query('UPDATE trains SET availableSeats = ? WHERE id = ?', [availableSeats, trainId], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).json({ error: 'Failed to update seats' });
                        });
                    }
                    connection.query('INSERT INTO bookings (userId, trainId) VALUES (?, ?)', [userId, trainId], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).json({ error: 'Failed to book seat' });
                            });
                        }

                        connection.commit((err) => {
                            if (err) return res.status(500).json({ error: 'Commit failed' });
                            res.status(201).json({ message: 'Seat booked successfully' });
                        });
                    });
                });
            });
        });
    });

}


const getSeatAvailability = async (req, res) => {
    const { source, destination } = req.body;
    db.query(
        'SELECT * FROM trains WHERE source = ? AND destination = ?',
        [source, destination],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch trains' });
            res.json(results);
        }
    );
}

module.exports = { getSeatAvailability, getBookingDetails, bookSeat }