import products from "../models/products"

export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body

    const newProduct = new products({name, category, price, imgURL});

    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)

}
export const getProducts = async (req, res) => {
    const product = await products.find()
    res.json(product)
}
export const getProductById = async (req, res) => {
    const product = await products.findById(req.params.productId);
    res.status(200).json(product)

}
export const updateProductById = async (req, res) => {
    const updateProduct = await products.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updateProduct)

}
export const deleteProductById = async (req, res) => {
    await products.findByIdAndDelete(req.params.productId)
    res.status(204).json()

}