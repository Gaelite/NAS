import sqlite3 from 'sqlite3';

const cdCommand = `cd ./pyscript && `;

export const realizarConsulta = (req, res) => {
    const query = req.query.q; 
    const db = new sqlite3.Database('network_data.db');

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });

    db.close();
};

