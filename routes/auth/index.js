var express = require('express');
var router = express.Router();
const authController = require('../../controllers/Admin/authController');
const serviceController = require('../../controllers/Admin/serviceController');
const userController = require('../../controllers/Admin/userController');
const parametreController = require('../../controllers/Admin/parametreController');
const fonction = require('../../models/fonction');


// Répertoire du fichiers upload
const uploadImageServices = fonction.uploadImage('./public/images/services');
const uploadImageUser = fonction.uploadImage('./public/images/users');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};



// Route auth
router.get('/home', authMiddleware, authController.home);

router.get('/logout', authMiddleware, authController.logout);



// route employe

// Route pour afficher le formulaire de création d'employé
router.get('/new-employe', authMiddleware, function(req, res, next) {
  res.render('pages/employes/create', { layout: "auth", title: "Page d'ajout employé", page: "Formulaire pour ajouté un employé"});
});

// Route pour enregistrer un nouvel employé
router.post('/save-employe', authMiddleware, uploadImageUser.array('photo'), userController.register);

// route profil user
router.get('/profile', authMiddleware, userController.profile);

// Route pour voir la liste des employé
router.get('/employes', authMiddleware, userController.listEmployes);

router.post('/update-photo-user', authMiddleware, uploadImageUser.single('file'), userController.updatePhoto);

router.get('/ajax-simple-user', authMiddleware, userController.getSimpleUser);

router.post('/update-profile-user', authMiddleware, userController.updateProfileUser);



// route service
router.get('/services', authMiddleware, serviceController.list);

router.post('/add-service', authMiddleware, uploadImageServices.array('images_services'), serviceController.created);

router.post('/modification-services', authMiddleware, uploadImageServices.array('images_services'),  serviceController.modificationServices);

router.post('/suppression-service', authMiddleware, serviceController.suppressionService);

router.get('/ajax-services/:id', authMiddleware, serviceController.ajaxSimpleServices);



// route paramètre
router.get('/parametre', authMiddleware, parametreController.list);

router.post('/update-password', authMiddleware, parametreController.updatePassword);

module.exports = router;