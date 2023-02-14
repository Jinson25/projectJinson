import User from "../models/user.js";
import { ROLES } from "../models/role.js";

export const checkUser = async (req, res, next) => {
    try {
        const userFound = await User.findOne({ username: req.body.username });
        if (userFound)
            return res.status(400).json({ message: "Usuario ya existe" });

        const email = await User.findOne({ email: req.body.email });
        if (email)
            return res
                .status(400)
                .json({ message: "EL email ya existe en nuestra base de datos" });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkRole = (req, res, next) => {
    req.body.roles.find();

    if (!req.body.roles) return res.status(400).json({ message: "No roles" });

    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
            return res.status(400).json({
                message: `Role ${req.body.roles[i]}  no existe`,
            });
        }
    }

    next();
};
