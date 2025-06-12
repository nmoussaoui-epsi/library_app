const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur connexion DB', err);
    } else {
        console.log('Connexion DB OK :', res.rows[0]);
    }
    pool.end();
});