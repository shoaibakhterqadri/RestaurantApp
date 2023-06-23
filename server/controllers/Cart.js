import Cart from "../model/Cart.js";
const AddtoCart = async (req, res) => {
    try {
        const { userId, dish, total } = req?.body
        console.log("🚀 ~ ", req?.body)
        if (!userId || !dish || !total) { return res.status(401).json({ message: "Data is missing" }) }
        const CartObj = { userId, dish, total }
        console.log("🚀 ~  CartObj:", CartObj)
        await Cart.create(CartObj)
        return res.status(200).json({ message: "Order has been recorded" });
    } catch (error) {
        console.log("🚀 error:", error)
        return res.status(500).json({ message: error?.message });
    }
}
const CartItemById = async (req, res) => {
    const id = req?.params?.id
    try {
        const getCartItems = await Cart.find({ userId: id })
        return res.status(200).json(getCartItems)
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const allCartItems = async (req, res) => {

    try {
        const getAllCartItems = await Cart.find({})
        return res.status(200).json(getAllCartItems)
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}

export { AddtoCart, CartItemById, allCartItems }