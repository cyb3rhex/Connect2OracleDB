const express = require('express');
const app = express();
const oracledb = require('oracledb');

app.get('/news', async (req, res) => {
  try {
    const connection = await oracledb.getConnection({
      user: 'UserName',
      password: 'passw0rd',
      connectString: 'connection_string'
    });

    const result = await connection.execute(
      `SELECT * FROM news`
    );

    res.json(result.rows);

    await connection.close();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
