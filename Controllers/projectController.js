const { query } = require('express');
const projects = require('../Models/projectSchema');

// Add projects logic
exports.addUserProjects = async (req, res) => {
    console.log("inside AddUserProject");
    const userId = req.payload; // Extract user ID from JWT payload
    const { title, language, github, link, overview } = req.body;
    const projectImage = req.file.filename; // Get image filename from multer
    console.log(projectImage);
    // Logic for adding new user project
    try {
        const existingProject = await projects.findOne({ github });
        if (existingProject) {
            res.status(406).json("This Project is already exist");
        } else {
            const newProject = new projects({ title, language, github, link, overview, projectImage, userId });
            await newProject.save();
            res.status(200).json(newProject);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// get user project
exports.getUserProject = async (req, res) => {
    // get userid
    const userId = req.payload;
    // api request
    try {
        // get project info of particular user
        const userProject = await projects.find({ userId });
        console.log(userProject);
        res.status(200).json(userProject);// send response to client 
    } catch (err) {
        res.status(401).json(err.message);
    }
};

// 2. get all projects 
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search;
    const query = {
        language: {
            $regex: searchKey,
            $options: "i"
        }
    };
    try {
        const AllProjects = await projects.find(query);
        res.status(200).json(AllProjects); // SEND RESPONSE TO CLIENT
    } catch (err) {
        res.status(401).json(err.message);
    }
};

// 3. get home projects
exports.getHomeProject = async (req, res) => {
    try {
        const HomeProject = await projects.find().limit(3);
        res.status(200).json(HomeProject);// send response to client
    } catch (err) {
        res.status(401).json(err.message);
    }
};

// 4. edit project details
exports.editProject = async (req, res) => {
    console.log("Inside edit project");
    const { title, language, github, link, overview, projectImage } = req.body;
    const uploadImage = req.file ? req.file.filename : projectImage;

    const userId = req.payload;

    const { id } = req.params;

    try {
        // find the paticular project id in mongodb and add the updated project details
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, { title, language, github, link, overview, projectImage: uploadImage, userId }, { new: true });
        // save updated pro details
        await updateProject.save();
        // response send back to client  
        res.status(200).json(updateProject);
    } catch (err) {
        res.status(401).json(err);
    }
};

// delete project details
exports.deleteProject = async (req, res) => {
    const { pid } = req.params;
    try {
        const deleteData = await projects.findByIdAndDelete({ _id: pid });
        res.status(200).json(deleteData);
    } catch (err) {
        res.status(401).json(err);
    }
};
