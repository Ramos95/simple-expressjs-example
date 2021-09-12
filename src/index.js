const express = require("express")
const app = express()
app.use(express.json())
const PORT = 3001

let notes = [{"id":"1","description":"lol"},{"id":"2","description":"lol"},{"id":"3","description":"lol"},{"id":"4","description":"lol"},{"id":"5","description":"lol"}]

app.get('/',(request,response)=>{
    response.send('<h1>LOL<h1>')
})

app.get("/api/notes",(request,response)=>{
    response.json(notes)
})

app.get("/api/notes/:id",(request,response)=>{
    const {id} = request.params
    const note = notes.find(note=>note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.post("/api/notes",(request,response)=>{
    const newNote=request.body
    if(newNote && newNote.description){
        notes.push(newNote)
        response.status(200).end()
    }else{
        response.status(400).json({error:"note without description"})
    }
   
})

app.delete("/api/notes/:id",(request,response)=>{
    const {id} = request.params
    notes = notes.filter(note=>note.id!==id)
    response.status(204).end()
})


app.listen(PORT,()=>{
    console.log(`app listeing on port: ${PORT}`)
})

