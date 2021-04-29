const fs = require('fs')
const { join } = require('path')

const filePatch = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePatch)
        ? fs.readFileSync(filePatch)
        : []
    try {
        return JSON.parse(data)
    } catch(error) {
        return []
    }
}

const saveUsers = (users) => fs.writeFileSync(filePatch, JSON.stringify(users, null, '\t'))

const userRoute = (app) =>{
    app.route('/users/:id?')
        .get((req, res) =>{
            const users = getUsers()

            return res.send({ users })
        })
        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUsers(users)
            return res.sendStatus(201).send('ok')
        })
        .put((req, res)=>{
            const users = getUsers()

            saveUsers(users.map(user=>{
                if(user.id === req.params.id){
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user

            }))
            res.sendStatus(200).send("ok")
        })
        .delete((req, res)=>{
            const users = getUsers()

            saveUsers(users.filter(user=> user.id !== req.params.id))
            res.sendStatus(200).send('ok')
        })
}

module.exports = userRoute