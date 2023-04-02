const client = require("../server");

//////////////////////////  Get  //////////////////////////
exports.getAllUsers = (req,res) => {
    client.query("SELECT * from users", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                message: "Impossible de trouver les utilisateurs." ,
                error: err
            });
        }
    });
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.login = (req,res) => {
    const user = JSON.parse(req.query.user);
    client.query("SELECT * from users WHERE login = $1", [user.login], (err, result) => {
        if(!err && result.rowCount !== 0){
            bcrypt.compare(user.password, result.rows[0].password).then(valid => {
                if (!valid) {
                    return res.status(404).json({ message: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    role: result.rows[0].role,
                    img: result.rows[0].img,
                    login: result.rows[0].login,
                    id: result.rows[0].id,
                    token: jwt.sign(
                        { role: result.rows[0].role, user: user._id, img: result.rows[0].img },
                        'Moussanko',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        }   else{
            return res.status(404).json({ 
                message: "Login incorrect." ,
                error: err
            });
        }
    });
}

exports.loginWithToken = (req,res,next) => {
    const token = req.query.token;
    if (token) {
      jwt.verify(token, 'Moussanko', function(err, decoded) {
          if (err) {
              return res.status(404).json({"error": true, "message": 'Unauthorized access.' });
          } else {
            res.status(200).json({
                "role": decoded.role,
                "img": decoded.img,
                "id": decoded.id,
                "login": decoded.login
            });
          }
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          "error": true,
          "message": 'No token provided.'
      });
    }
}



////////////////////////  Post  //////////////////////////
exports.signup = (req,res) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const password = hash;
        const id = req.body.id;
        const login = req.body.login;
        const role = req.body.role;
        client.query("INSERT INTO users(id,login,password,role) Values ($1,$2,$3,$4)", [id,login,password,role], (err, result) => {
            if(!err){
                res.status(201).json({
                    message: "Utilisateur ajouté avec succès.",
                });
            } else{
                console.log(err);

                return res.status(404).json({ 
                    message: "L'utilisateur n'a pas pu être ajouté." ,
                    error: err
                });
            }
        });
      })
      .catch(error => res.status(500).json({ error }));
}

////////////////////////  Update  //////////////////////////
exports.updateUser = (req,res,next) => {
    const id = req.params.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const role = req.body.role;

    client.query("UPDATE users SET nom = $2, prenom = $3, role = $4 WHERE id = $1", [id,nom,prenom,role], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Utilisateur modifié avec succès.",
            });
        } else{
            return res.status(404).json({ 
                message: "L'utilisateur n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}


////////////////////////  Delete  //////////////////////////
exports.deleteUser = (req,res,next) => {
    const id = req.params.id;

    client.query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Utilisateur supprimé.",
            });
        } else{
            return res.status(404).json({ 
                message: "L'utilisateur n'a pas pu être supprimé.",
                error: err
            });
        }
    });
}
