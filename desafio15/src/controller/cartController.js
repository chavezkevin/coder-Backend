import { cartDAO } from "../DAO/cartDAO.js";
import { productDAO } from "../DAO/productDAO.js";

const cartControllerGet = async (req, res) => {
    try {
        const idCart = req.params.id
        const cartResponse = await cartDAO.getById(idCart)

        res.send(cartResponse)
    } catch (error) {
        console.log(error)
    }
}

const cartControllerInsertProduct = async (req, res) => {
    try {
        //obtenemos datos necesarios del req.session
        const cartId = req.params.cart_id
        const productId = req.params.product_id
        // const productTitle = req.params.product_title
        // const productPrice = req.params.product_price
        // const productThumbnail = req.params.product_thumbnail

        //obtenemos el carrito que debemos updatear
        const cartToUpdate = await cartDAO.getById(cartId)

        //checkeamos si el producto a agregar ya existe en el carrito del user
        const existingProductInCart = cartToUpdate.products.find(product => product.productId == productId)


        if (existingProductInCart) {
            existingProductInCart.quantity += 1
        } else {
            cartToUpdate.products.push({
                productId: productId,
                // title: productTitle,
                // price: productPrice,
                // thumbnail: productThumbnail,
                quantity: 1
            })
        }

        //actualizamos el carrito del user
        await cartDAO.updateDocument(cartId, cartToUpdate)
        console.log(`Producto ${productId} agregado al carrito`)

        res.redirect("/api/login")

    } catch (error) {
        console.log(error)
    }
}

const cartControllerGetUserCart = async (req, res) => {
    try {
        const { products } = await cartDAO.getByUserId(req.session.userId)

        const ProductsPromises = await products.map(async (product) => {
            const productData = await productDAO.getById(product.productId)
            return {
                productId: productData._id,
                title: productData.title,
                thumbnail: productData.thumbnail,
                price: productData.price,
                quantity: product.quantity
            }
        })

        const productsComplete = await Promise.all(ProductsPromises)

        res.render("plantillaCart.ejs", { productsComplete })
    } catch (error) {
        console.log(error)

    }
}

const cartControllerPost = async (req, res) => {
    try {
        const cartResponse = await cartDAO.createDocument()

        res.send(`Carrito insertado en la base con id: ${cartResponse} :)`)
    } catch (error) {
        console.log(error)
    }

}

const cartControllerProductsPost = async (req, res) => {
    try {
        const cartId = req.params.id
        const bodyCart = req.body

        const cartResponse = await cartDAO.updateDocument(cartId, bodyCart)

        res.send(cartResponse)

    } catch (error) {
        console.log(error)
    }
}

const cartControllerDelete = async (req, res) => {
    try {
        const cartId = req.params.id
        const cartResponse = await cartDAO.deleteById(cartId)

        res.send(cartResponse)
    } catch (error) {
        console.log(error)
    }
}

const cartControllerProductDelete = async (req, res) => {
    try {
        const cartId = req.params.id
        const productId = req.params.id_prod

        const cartResponse = await cartDAO.deleteProductInCart(cartId, productId)

        res.send(cartResponse)

    } catch (error) {
        console.log(error)
    }
}

export { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete, cartControllerInsertProduct, cartControllerGetUserCart }
