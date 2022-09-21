import { cartDAO } from "../DAO/cartDAO.js"

const registerController = async (req, res) => {

    res.render('plantillaRegister.ejs')
}

const registerPostController = async (req, res) => {
    try {
        //guardamos en el req.session valores que usaremos
        req.session.user = req.body.username
        req.session.userId = req.body.userId
        req.session.email = req.user.email
        req.session.avatar = req.body.avatar

        //creamos un carrito para el user 
        const newCartId = await cartDAO.createDocument(req.session.userId)
        req.session.cartId = newCartId

        res.redirect("/api/login")

    } catch (error) {
        console.log(error)
    }
}

const registerErrorController = async (req, res) => {
    res.render('plantillaRegisterError')
}

export { registerController, registerPostController, registerErrorController }