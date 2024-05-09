
import sqlite3 from 'sqlite3';

// Función para realizar la consulta a la base de datos
function realizarConsulta(req, res) {
    const query = req.query.q; // Suponiendo que el parámetro 'q' contiene la consulta
    const db = new sqlite3.Database('network_data.db');

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });

    db.close();
}

module.exports = {
    realizarConsulta
};
