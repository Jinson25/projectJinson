import {Router} from 'express'
const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import { authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isModerador], productsCtrl.createProduct)

router.get('/', productsCtrl.getProducts) //optener

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId',[authJwt.verifyToken, authJwt.isModerador], productsCtrl.updateProductById)

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById)



export default router;