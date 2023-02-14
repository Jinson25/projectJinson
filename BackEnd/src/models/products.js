import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imgURL: String,
},{
    timestamps: true,
    versionKey: false
})

export default model('products', productsSchema)