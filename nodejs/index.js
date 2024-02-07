const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'database-mysql',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Lucas')`;
connection.query(sql);
connection.end();

const getPeople = async () => {
    const connection = mysql.createConnection(config);
    const selectQuery = `SELECT * FROM people`;
  
    return new Promise((resolve, reject) => {
      connection.query(selectQuery, (err, results) => {
        connection.end();
        if (err) {
          reject(err);
        }
        if (results.length >= 0) {
          resolve(results.map((people) => `<p>${people.name}</p>`).join(''));
        } else {
          resolve('');
        }
      });
    });
  };
  
  app.get('/', async (req, res) => {
    res.send(`
        <h1>Full Cycle Rocks!</h1>
        ${await getPeople()}
      `);
  });
  
app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
});