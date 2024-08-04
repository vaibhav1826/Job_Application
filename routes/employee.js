const {Router} = require('express');
const multer =require('multer');
const Employee = require('../models/employee');
const path = require('path');
const route = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage: storage });

route.get("/add-new",(req,res)=>{
    return res.render('addemployee',{
        user : req.user,
    });
});

route.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate("createdBy");
  return res.render("employee", {
    user: req.user,
    employee,
  });
});


route.post("/",upload.single("coverImage"),async(req,res)=>{
    const { Name, ContactNumber, Address , AddharcardNumber, PANcard, Role ,Experience } = req.body;
    const employee = await Employee.create({
    Name,
    ContactNumber,
    Address,
    AddharcardNumber,
    PANcard,
    Role,
    Experience,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/employee/${employee._id}`);
  });
  


module.exports = route;