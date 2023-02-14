import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user";
import Role from '../models/role'
import role from "../models/role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(token);

    if (!token) return res.status(403).json({ message: "No existe token" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user)
    return res.status(404).json({ message: "Usuario no encontrado" });
    console.log(decoded, user);
    next();
} catch (error) {
    return res.status(401).json({message: 'No autorizado'})
}
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      return next();
    }
  }
  return res.status(403).json({ message: "Requieres los permisos de administrador" });
}
export const isModerador = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id: {$in: user.roles}})

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderador") {
      return next();
    }
  }
  return res.status(403).json({ message: "Requieres los permisos de moderador" });
};

