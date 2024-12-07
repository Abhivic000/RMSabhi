const db = require('../model/db.model');

// exports.addTrain = (req, res) => {
//     const { name, source, destination, totalSeats } = req.body;
//     db.query(
//         'INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)',
//         [name, source, destination, totalSeats, totalSeats],
//         (err) => {
//             if (err) return res.status(500).json({ error: 'Failed to add train' });
//             res.status(201).json({ message: 'Train added successfully' });
//         }
//     );
// };
const addTrain = async(req,res)=>{
    const { name, source, destination, totalSeats } = req.body;
    db.query(
        'INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)',
        [name, source, destination, totalSeats, totalSeats],
        (err) => {
            if (err) return res.status(500).json({ error: 'Failed to add train' });
            res.status(201).json({ message: 'Train added successfully' });
        }
    );
}

module.exports={addTrain}

