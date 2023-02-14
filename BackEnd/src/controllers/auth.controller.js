import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/role'

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encrypPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name:"user"})
        if (role) {
            newUser.roles = [role._id];
        }
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24horas
    })

    console.log(newUser)
    res.status(200).json({token})
}


export const signIn = async(req, res)=> {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if (!userFound) {
        return res.status(401).json({message: "Usuario no encontrado"})
    }

    const mathPassword = await User.comparePassword(req.body.password, userFound.password)
    if (!mathPassword) {
        return res.status(401).json({message: "Contraseña incorrecta"})
    }
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })
    console.log(userFound)
    res.json({token: token, message:"Ingreso exitoxamente"})

}