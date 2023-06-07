const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    //ROUTE1:get all the notes, login required
    try{const notes = await Note.find({ user: req.user.id });
    res.json(notes)
}
catch(error){
    console.log(error.message);
        res.status(500).send("some system error occured")

}})

//ROUTE2:add a new note using POST:/api/auth/addnote,  login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid email').isLength({ min: 5 }),
], async (req, res) => {
    const {title,description,tag}=req.body;
    //if there are errros retyrn abd nrequrest and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //create a new note
    try{
        const note=new Note({title,description,tag,user:req.user.id})
    const savedNote=await note.save()
    res.json(savedNote)}
    catch(error){
        console.log(error.message);
        res.status(500).send("some system error occured")
    }
})


    //ROUTE3:update an existing notes using POST:"updatenote", login required
    router.put('/updatenote/:id', fetchuser, async (req, res) => {
const {title,description,tag}=req.body;
const newNote={};
if(title){
    newNote.title=title};

if(description){
    newNote.description=description};

if(tag){
    newNote.tag=tag};

    //find the note to be updated and update it 
let note=await Note.findById(req.params.id);
if(!note)
{
   return res.status(404).send("Not Found")
}
if(note.user.toString()!=req.user.id){
    return res.status(401).send("not allowed")
}
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
    })

 //ROUTE4:delete an existing notes using DELETE:"deletenote", login required
 router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   
    try{
        //find the note to be updated and delete it 
    let note=await Note.findById(req.params.id);
    if(!note)
    {
       return res.status(404).send("Not Found")
    }
    //allow dleteion only if user owns this note
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("not allowed")
    }
    note=await Note.findByIdAndDelete(req.params.id,{new:true})
    res.json("success note has been deleted")}
    catch(error){
        console.log(error.message);
        res.status(500).send("some system error occured")
    }
        })
    
module.exports = router