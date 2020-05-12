const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")

//fetch all data
router.get("/fetchall", (req, res) => {
    User.find() 
    .then(data=>{
        res.json({data})
    })
    .catch(err=>{
        console.log(err)
    })
});
//req.user = userdata .populate("postedBy","_id name")
//insert data

router.post('/adduser',(req,res)=>{
    const {name} = req.body
    const user = new User({
        name
    })
    user.save().then(result=>{
        res.json({user:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//delete user

router.delete('/delete/:id',(req,res) =>{
    User.findOne({_id:req.params.id})
    .then(data=>{
        data.remove()
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//fetch user by id

router.get('/fetch/:id',(req,res) =>{
    User.findOne({_id:req.params.id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

//update user

router.put('/update/:id',(req,res) =>{

    const Id  = req.params.id;
    var name = { $set: {name: req.body.name } };

    User.findByIdAndUpdate({_id:Id}, name)
    .then(data =>{
        res.json(data)
    }).catch(err=>{console.log(err)})

    // User.findOneAndUpdate(req.body.id, name)
    // .then(data =>{
    //     res.json(data)
    // })
    // .catch(err=>{console.log(err)})

    // User.updateOne(req.param.id,{
    //     $set:{name: req.body.name}
    // }).then(result=>{
    //     res.json(result)
    // },{
    //     new:true
    // }).catch(err=>{
    //     return res.status(422).json({error:err})
    // })


})

module.exports = router