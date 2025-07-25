import connectToDatabase from './db/db.js'
import User from './models/User.js'

const userRegister = async () =>{
    connectToDatabase()
    try{
        // const hashPassword = await bcrypt.hash('admin', 10);
        // console.log(object);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin",
            role: "admin"
        })
        await newUser.save()
    } catch(error){
        console.log(error)
    }
}

userRegister();