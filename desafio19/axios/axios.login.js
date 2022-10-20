import axios from "./axios.instance.js";

const getCookies = (headers) => {
    let cookies = headers["set-cookie"];
    cookies = cookies.split(";")[0];
    return cookies;
}

const loginAxios = async () => {
    try {
        //logeo y obtencion de cookie
        const loginResponse = await axios.post(`/api/user/login`, {
            username: "luks",
            password: "1234"
        })
        console.log("----loginResponse.data----", loginResponse.data)
        console.log("----loginResponse.headers----", loginResponse.headers)

        //guardado de la cookie
        const cookies = getCookies(loginResponse.headers)
        console.log("++++++++++++cookies+++++++++++++++", cookies)

        //obtencion de productos
        const getAllProductsResponse = await axios.get(`/api/products/all`, {
            headers: { cookie: cookies }
        })
        console.log("-----getAllProductsResponse.data----", getAllProductsResponse.data)

        //guardado de nuevo producto
        const newProduct = await axios.post(`/api/products/`, {
            title: "producto test axios",
            description: "descripcion producto test axios",
            code: "codigo test axios",
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJuCk4CuYi-amvOWXM0xI6vKiNWo0VQ6jmZg&usqp=CAU',
            price: 1,
            stock: 1
        }, {
            headers: { cookie: cookies }
        })
        console.log("------Nuevo array de productos con el producto test incluido------", newProduct.data)


    } catch (error) {
        console.log(error)
    }
}

loginAxios()