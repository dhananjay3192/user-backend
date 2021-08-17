const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

exports.getUser = (req, res) =>{
    const id = req.params.id
    fs.readFile('./user.json', 'utf-8', (err, jsonString)=>{
          if(err){
              console.log('err', err)
          }
          else{
              const data = JSON.parse(jsonString)
              const responseData = data.users.find(element => element.id == id)
              res.send({
                  user: responseData
              })
          }
    })
}

exports.getAllUsers = (req, res) =>{
    fs.readFile('./user.json', 'utf-8', (err, jsonString)=>{
          if(err){
              console.log('err', err)
          }
          else{
              const data = JSON.parse(jsonString)
              const responseData = data.users
              res.send({
                  allUsers: responseData
              })
          }
    })
}

exports.addUser = (req, res) => {
    fs.readFile('./user.json', 'utf-8', (err, jsonString)=>{
        if(err){
            console.log('err', err)
        }
        else{
            const data = JSON.parse(jsonString)
            data.users.push({...req.body, id: uuidv4()})
            const json = JSON.stringify(data)
            fs.writeFile('./user.json', json, (err) => {
                if(err){
                    console.log("error occurred")
                }else{
                    res.send("new user added")
                }
            })
        }
   })  
}

exports.updateUser = (req, res) => {
    const id = req.params.id;

    fs.readFile('./user.json', 'utf-8', (err, jsonString)=>{
        if(err){
            console.log('err', err)
        }
        else{
            let data = JSON.parse(jsonString)
            const updatedData = data.users.map(user => {
                if(user.id == id){
                    let updatedUser = {...user, ...req.body}
                    return updatedUser
                }
                return user
            })
            data.users = updatedData
            const json = JSON.stringify(data)
            fs.writeFile('./user.json', json, (err) => {
                if(err){
                    console.log("error occurred")
                }else{
                    res.send(`user with id:${id} updated`)
                }
            })
        }
   })  
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    fs.readFile('./user.json', 'utf-8', (err, jsonString)=>{
        if(err){
            console.log('err', err)
        }
        else{
            let data = JSON.parse(jsonString)
            let newData = data.users.filter(user => user.id != id)
            data.users = newData
            const json = JSON.stringify(data)
            fs.writeFile('./user.json', json, (err) => {
                if(err){
                    console.log("error occurred")
                }else{
                    res.send(`user with id:${id} deleted`)
                }
            })
        }
   })  
}