const User = require("../models/usersModel");

const { getPostData } = require("../utils/utils");

// get users GET /get-users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// get user GET /get-user/{id}
async function getUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// create user POST /add-user
async function saveUser(req, res) {
  try {
    const body = await getPostData(req);

    const { username, password, email } = JSON.parse(body);

    const user = new User(username, password, email);
    user.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// delete user DELETE /delete-user/{id}
async function deleteUser(req, res, id) {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await User.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({message:`User ${id} removed`}));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

module.exports = {
  getUsers,
  getUser,
  saveUser,
  deleteUser,
};
