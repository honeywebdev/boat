import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {

    let targetProduct;
    let targetProductIndex;

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(0);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        })
    }

    const onAdd = (product, quantity) => {

        const productExist = cartItems.find((item) => item._id === product._id);

        setTotalPrice((previousPrice) => previousPrice + product.price * quantity);
        setTotalQuantity((previousTotal) => previousTotal + quantity);

        if (productExist) {
            const updatedCartItem = cartItems.map((item) => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
            })

            setCartItems(updatedCartItem);
        }
        else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty} ${product.name} added to cart`);


    }

    const onRemove = (product) => {
        const targetProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id != targetProduct._id);
        setCartItems(newCartItems);
        setTotalPrice((previousPrice) => previousPrice - targetProduct.price * targetProduct.quantity);
        setTotalQuantity((previousTotal) => previousTotal - targetProduct.quantity);
    }

    const toggleCartItemQuantity = (id, value) => {
        targetProduct = cartItems.find((item) => item._id === id);
        // targetProductIndex = cartItems.findIndex((item) => item._id === id);
        let newCartItems = cartItems.filter((item) => item._id != id);


        if (value == "inc") {
            setCartItems([...newCartItems, { ...targetProduct, quantity: targetProduct.quantity + 1 }])
            setTotalPrice((previousPrice) => previousPrice + targetProduct.price);
            setTotalQuantity((previousTotal) => previousTotal + 1);
        }
        else if (value == "dec") {
            if (targetProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...targetProduct, quantity: targetProduct.quantity - 1 }])
                setTotalPrice((previousPrice) => previousPrice - targetProduct.price);
                setTotalQuantity((previousTotal) => previousTotal - 1);
            }

        }
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            setShowCart,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantity
        }} >
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);
