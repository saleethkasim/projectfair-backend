// import express
const express = require('express');
const userController = require('../Controllers/userController');

const projectController=require('../Controllers/projectController')

const jwtmiddleware=require
('../Middlewares/jwtmiddleware')

const multerConfig=require('../Middlewares/multerMiddleware')

// create a router object of express to define routes (paths)
const router = new express.Router();

// using router to define paths

// register API routes - localhost:4000/register
router.post('/register', userController.register);



// login api routes-localhost:4000/login
router.post('/login',userController.login);

//3 add user project api routes-localhost:4000/project/add
router.post('/project/add',jwtmiddleware,multerConfig.single('projectImage'),projectController.addUserProjects)


//get user project api  route-localhost:4000/user/all-project
router.get('/project/all-user-projects',jwtmiddleware,projectController.getUserProject)

//5 get all projects routess-localhost:4000/project/all -project
router.get('/project/all-projects',jwtmiddleware,projectController.getAllProjects)

//6 get home page routes-localost:4000/project/home-projects
router.get('/project/home-projects',projectController.getHomeProject)

//7 update project routes-localhost:4000/project/update-project/76789876456
router.put('/project/update-project/:id',jwtmiddleware,multerConfig.single('projectImage'),projectController.editProject)

//delete project routes-localhost:4000/project/delete-project/45678987654456
router.delete( '/project/delete-project/:pid',jwtmiddleware,projectController.deleteProject)

module.exports = router;
