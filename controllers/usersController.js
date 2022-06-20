const User = require("../models/usersModel");
const { getPostData } = require("../utils/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// get user GET /get-api-user
async function getApiUser(req, res) {
  try {
    // userId il iau din token-ul din cookie...

    let value = ""
    let token = ""
    const cookieHeader = req.headers?.cookie
    
    if(cookieHeader) {
      cookieHeader.split(`;`).forEach(cookie => {
        let [name, ...rest] = cookie.split(`=`)
        if(name === "jwt") {
          value = rest.join(`=`).trim()
          if(value) {
            token =  decodeURIComponent(value)
          }
        }
      });
    }
    
    if(value === "" || value === "undefined") {
      res.writeHead(401, { "Content-Type": "application/json"});
      res.end(JSON.stringify({ route: "/Login.html", message: "You must login to view Profile page!" }));
    }
    else {
      // decodificare token preluat din cookie
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const userId = decodedToken['data']['id']

      // user-ul din sesiunea curenta
      const user = await User.findById(userId);
      
      res.writeHead(200, { "Content-Type": "application/json"});
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}


// register user POST /add-user
async function saveUser(req, res) {
  console.log("[saveUser]");
  try {
    const body = await getPostData(req);

    const { username, password1, email, password2 } = JSON.parse(body);
    console.log("[user-controller]", username, password1, email, password2);

    if (User.validateUsernameFormat(username) === null) {
      console.log(
        "[user-controller] Username format is invalid. Don't use special characters such as $, <>, ! or {}!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/Register.html",
          message:
            "Username format is invalid. Don't use special characters such as $, ! or {}!",
        })
      );
    } else {
      const findUser = await User.findByUsername(username);

      if (!findUser.length) {
        if (User.validateEmailFormat(email) === null) {
          console.log(
            "[user-controller] Email must not contain special characters such as $, ! or {}!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/Register.html",
              message:
                "Email must not contain special characters such as $, ! or { }",
            })
          );
        } else if (User.validatePasswordFormat(password1) === null) {
          console.log(
            "[user-controller] Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/Register.html",
              message:
                "Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!",
            })
          );
        } else if (password1 !== password2) {
          console.log(
            "[user-controller] Please make sure your passwords match!"
          );
          res.writeHead(200, { "Content-Type": "application/json" });

          res.end(
            JSON.stringify({
              route: "/Register.html",
              message: "Please make sure your passwords match!",
            })
          );
        } else {
          let hashPassword = bcrypt.hashSync(
            password1,
            parseInt(process.env.BCRYPT_SALT)
          );

          const user = new User(username, hashPassword, email);
          user.save();

          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/Login.html",
              message: "Your account has been created successfully!",
            })
          );
        }
      } else {
        console.log(
          "[user-controller] Username (%s) already exists!",
          username
        );
        res.writeHead(409, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            route: "/Register.html",
            message: "Username already exists!",
          })
        );
      }
    }
  } catch (err) {
    console.log(err);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// login user POST /login-user
async function loginUser(req, res) {
  try {
    const body = await getPostData(req);

    const { username, password } = JSON.parse(body);

    if (User.validateUsernameFormat(username) === null) {
      console.log(
        "[user-controller] Username format is invalid. Don't use special characters such as $, <>, ! or {}!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/Login.html",
          message:
            "Username format is invalid. Don't use special characters such as $, <>, ! or {}!",
        })
      );
    }
    else if(User.validatePasswordFormat(password) === null) {
      console.log(
        "[user-controller] Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!"
      );
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          route: "/Login.html",
          message:
            "Password: 1 number, 1 uppercase, 1 lowercase and at least 8 from the mentioned characters!",
        })
      );
    }
    else {
      const loginUser = await User.findByUsername(username);

      if (loginUser.length) {
        //check passwords
        if (bcrypt.compareSync(password, loginUser[0]["password"])) {
          const token = jwt.sign(
            {
              data: {
                id: loginUser[0]["_id"],
                email: loginUser[0]["email"],
                username: loginUser[0]["username"],
              },
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              route: "/index.html",
              message: "Login successful!",
              information: token,
            })
          );
        } else {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ route: "/Login.html", message: "Wrong password!" })
          );
        }
      } else {
        console.log("[user-controller] Wrong username!");
        res.writeHead(403, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({ route: "/Login.html", message: "Wrong username!" })
        );
      }
    }
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
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
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
  getApiUser,
  saveUser,
  loginUser,
  deleteUser,
};
