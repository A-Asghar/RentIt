const express = require("express");
const router = require("express").Router();
const User = require("../models/userModel")
const CryptoJS = require("crypto-js");

router.post("/login", async(req, res) => {

      const {username , password} = req.body
      
      try {
          const user = await User.findOne({username})
          var decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            "rentacar"
          );
          const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
          if(user && password == OriginalPassword) {
              res.send(user)
          }
          else{
              return res.status(400).json(error);
          }
      } catch (error) {
        return res.status(400).json(error);
      }
  
});


router.post("/register", async(req, res) => {

    

    try {

       
        const newuser = new User(req.body)
        newuser.password = CryptoJS.AES.encrypt(
          req.body.password,
          "rentacar"
        ).toString()
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});

router.post("/edituser", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = CryptoJS.AES.encrypt(
      req.body.password,
      "rentacar"
    ).toString();
    user.address = req.body.address;

    await user.save();

    res.send(user);
  } catch (error) {
    return res.status().json(error);
  }
});
router.get("/get/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router

