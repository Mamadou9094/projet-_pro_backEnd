const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");

exports.findOne = (email, callback) => {
  db.execute(`SELECT * from user where email = ?`, [email], (error, result) => {
    if (error) {
      console.log("error: ", error);
      callback(error, null);
      return;
    }
    callback(null, result);
  });
};
exports.addOne = (reqBody, callback) => {
  const { email, password, first_name, last_name, role } = reqBody;

  bcrypt.hash(password, 10, (err, bcryptedPassword) => {
    db.execute(
      `INSERT INTO user SET email=?, password=?, firstname=?, lastname=?, role=?`,
      [email, bcryptedPassword, first_name, last_name, role],
      (error, result) => {
        if (error) {
          console.log("error : ", error);
          callback(error, null);
        }
        callback(null, result);
      }
    );
  });
};
