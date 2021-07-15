const { response } = require("express");
const express = require("express");
const Users = require("../models/users.model");

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;
const NAME_REGEX = /^([a-zA-Z ]+)$/;

exports.signup = (req, res) => {
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  if (
    email == null ||
    password == null ||
    first_name == null ||
    last_name == null
  ) {
    return res.status(400).json({
      error: "paramettre mon compte",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      error: "email is not valid",
    });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      error:
        "password invalid (must length 4 - 12 and include 1 number at least)",
    });
  }

  if (!NAME_REGEX.test(first_name)) {
    return res.status(400).json({
      error: "first_name invalid (must be a string)",
    });
  }
  if (!NAME_REGEX.test(last_name)) {
    return res.status(400).json({
      error: "last_name invalid (must be a string)",
    });
  }

  Users.findOne(email, (error, response) => {
    if (error) {
      response.send(error.message);
    }
    if (response == "") {
      Users.addOne(req.body, (error, result) => {
        return res.status(201).json({
          succes: "utilisateur ajouter avec succes",
        });
      });
    } else {
      return res.status(409).json({
        error: "utilisateur existe deja",
      });
    }
  });
};
