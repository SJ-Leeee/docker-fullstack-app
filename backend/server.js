const express = require("express");
const bodyPerser = require("body-parser");
// const cors = require("cors");

const db = require("./db.js");
const app = express();

// 테이블 생성하기
db.pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }

  // 테이블 생성하기
  connection.query(
    `CREATE TABLE IF NOT EXISTS lists (
      id INTEGER AUTO_INCREMENT,
      value TEXT,
      PRIMARY KEY (id)
    )`,
    (err, results, fields) => {
      if (err) {
        console.error("Error creating table:", err);
        connection.release();
        return;
      }
      console.log("Table created successfully");
      connection.release();
    }
  );
});

// app.use(cors({ origin: "*" }));
app.use(bodyPerser.json());
app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists", (err, results, fileds) => {
    if (err) return res.status(499).send(err);
    else return res.json(results);
  });
});

app.post("/api/value", (req, res, next) => {
  db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fileds) => {
    if (err) return res.status(499).send(err);
    else return res.json({ success: true, value: req.body.value });
  });
});

app.listen(5000, () => {
  console.log(`서버가 5000번 포트로 열렸습니다리.`);
});
