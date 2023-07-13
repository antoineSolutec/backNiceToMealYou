const client = require("../server");

exports.getTypes = (req,res) => {
    client.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name = 'users';", (err, result) => {
        if(!err){
            res.send(result.rows);
        } else{
            return res.status(404).json({ 
                error: err
            });
        }
    });
}

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
            const id = result.rows[0].id;
            const login = result.rows[0].login;
            bcrypt.compare(user.password, result.rows[0].password).then(valid => {
                if (!valid) {
                    return res.json({ message: 'Mot de passe incorrect', error: true });
                } else{
                    const params = { role: result.rows[0].role, user: user._id, id: id, login: login};
                    res.status(200).json({
                        params,
                        token: jwt.sign(
                            params,
                            'Moussanko',
                            { expiresIn: '24h' }
                        )
                    });
                }
                
                
            })
            .catch(error => res.status(500).json({ error }));
        }   else{
            console.log(err, result);
            return res.json({ 
                message: "Login incorrect." ,
                error: true
            });
        }
    });
}

exports.loginWithToken = (req,res,next) => {
    const token = req.body.token;
    if (token) {
      jwt.verify(token, 'Moussanko', function(err, decoded) {
          if (err) {
            return res.send({"error": true, "message": 'Unauthorized access.' });
          } else {
            res.status(200).json({
                "role": decoded.role,
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
      console.log(error)
      return res.status(403).send({
          "error": true,
          "message": 'No token provided.'
      });
    }
}

exports.getImageOfUser = (req,res) => {
    client.query("SELECT img FROM users WHERE id = $1", [req.params.id], (err, result) => {
        if(!err){
            res.status(201).json(result.rows[0]);
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "L'utilisateur n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}

exports.getPlaceOfUser = (req,res) => {
    client.query("SELECT id_place FROM user_list WHERE id_user = $1", [req.params.id], (err, result) => {
        if(!err){
            let ids = [];
            result.rows.forEach(element => {
                ids.push(element.id_place);
            });
            res.status(201).json(ids);
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "L'utilisateur n'a pas pu être modifié." ,
                error: err
            });
        }
    });
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
exports.addPlaceOfUser = (req,res) => {
    client.query("INSERT INTO user_list(id_user,id_place) Values ($1,$2)", [req.body.idUser,req.body.idPlace], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Lieu ajouté avec succès.",
            });
        } else{
            console.log(err)
            return res.status(404).json({ 
                message: "Le lieu n'a pas pu être ajouté." ,
                error: err
            });
        }
    });
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

exports.modifyPassword = (req,res,next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const password = hash;
        const id = req.body.id;
        client.query("UPDATE users SET password = $2 WHERE id = $1", [id,password], (err, result) => {
            if(!err){
                res.status(201).json({
                    message: "Utilisateur modifié avec succès.",
                });
            } else{
                console.log(err);

                return res.status(404).json({ 
                    message: "L'utilisateur n'a pas pu être modifié." ,
                    error: err
                });
            }
        });
    })
}

exports.modifyLogin = (req,res,next) => {
    client.query("UPDATE users SET login = $2 WHERE id = $1", [req.body.id,req.body.login], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Utilisateur modifié avec succès.",
            });
        } else{
            console.log(err);

            return res.status(404).json({ 
                message: "L'utilisateur n'a pas pu être modifié." ,
                error: err
            });
        }
    });
}

exports.modifyImage = (req,res,next) => {
    client.query("UPDATE users SET img = $2 WHERE id = $1", [req.body.id,req.body.img], (err, result) => {
        if(!err){
            res.status(201).json({
                message: "Utilisateur modifié avec succès.",
            });
        } else{
            console.log(err);

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
