var express = require('express');
var router = express.Router();

const User = require("../models/users")


//GET - /
router.get('/', function(req, res, next) {
  res.json({ message: 'Express' });
});


//GET FIND - /users
router.get("/users", (req, res) => {
  User.find()
  .then((data) => {
    res.json({users: data})
  })
})


//GET FINDONE- /users/:firstname
router.get("/users/:firstname", (req, res) => {
  User.findOne({firstname: req.params.firstname})
  .then((data) => {
    if(data) {
      res.json({user: data})
    } else {
      res.json({error: "user does not exist"})
    }
  })
})


//GET FIND tous les firstame - /users
router.get("/users/all/:firstname", (req, res) => {
  User.find({firstname: req.params.firstname})
  .then((data) => {
    if(data.length > 0) {
      res.json({user: data})
    } else {
      res.json({error: "user does not exist"})
    }    
  })
})


//GET FINDBYID - /users/:id
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
  .then((data) => {
    if (data) {
      res.json({user_id: data})
    } else {
      res.json({error: "id not found"})
    }
  })
})


// POST Ajout d'un nouneau User - /users
router.post("/users", (req,res) => {

  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    premium: req.body.premium,
    hobbies: req.body.hobbies
  })

  newUser.save()
  .then((data) =>  {
    console.log(data.firstname)
    User.find()
    .then((data) => {
      res.json({users: data})
    })
  })
})


// UPDATEONE - /users
router.put("/users", (req, res) => {
  User.updateOne(
    {firstname: req.body.firstname}, //le critère de recherche
    {lastname: "change"}          // l'élément à modifier
  ).then(() => {
    User.find().then((data) => {
      res.json({udpatedUsers: data})
    })
  })
})


// UPDATEMANY - /users/all
router.put("/users/all", (req, res) => {
  User.updateMany(
    {firstname: "Eric"},
    {age: 28}
  ).then(() => {
    User.find()
    .then((data) => {
      res.json({"all users updated": data})
    })
  })
})


// DELETEONE - /users/:firstname
router.delete("/users/firstname", (req, res) => {
  User.deleteOne(
    {firstname: req.body.firstname}
  ).then((data) => {
    console.log("csf", data)
    User.find()
    .then((data) => {
      res.json({"deletes" : data})
    })
  })
})


// DELETEMANY supprime tous les utilisateurs - /user
router.delete("/users", (req, res) => {
  // User.deleteMany({firstname : "Eric"})
  User.deleteMany()
  .then(() => {
    User.find()
    .then((data) => {
      res.json({"all users deleted": data})
    })
  })
})

module.exports = router;


//Comment on fait pour pssser des données dans un tableau dans Thunderclient?

//Est ce que je peux appeler findById et un findOne dans le meme GET:/firstname/:id en chageant juste req.params.firstname
// et req.params.id?

//Sur la doc de Express, on se sert de app pour faire app.get et on var app = express()
//Pkoi utiliser router = expressRouter ? Quelle difference à rajouter une méthode spécifique à Router?

//Pkoi dans mon POST, si jenvoie juste le firstname ca me crée quand meme un nouveau User,
//le modele ne vérifie pas que toutes les references sont bien remplis avant d'enregistrer?

// Est ce qu'on peut appeler une méthode sans la mettre dans une route?

// le console.log ligne 115 renvoie : { acknowledged: true, deletedCount: 1 }, est ce que c'est sur une de 
// ces 2 valeurs qu'on test si une data a bien été supprimée?