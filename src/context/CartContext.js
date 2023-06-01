import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducer/cartReducer"

let oldTotal = JSON.parse(localStorage.getItem("oldTotal"))
let oldData = JSON.parse(localStorage.getItem("oldData"));

const initialState = {
    cartList: oldData || [],
    total: oldTotal || 0
}

const CartContext = createContext(initialState)

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addToCart = (product) => {
        const updatedCartlist = state.cartList.concat(product);
        updateTotal(updatedCartlist)
        localStorage.setItem("oldData", JSON.stringify(updatedCartlist))

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartlist
            }
        })
    }

    const removeFromCart = (product) => {
        const updatedCartlist = state.cartList.filter(cartItem => cartItem.id !== product.id)
        updateTotal(updatedCartlist)
        localStorage.setItem("oldData", JSON.stringify(updatedCartlist))

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartlist
            }
        })
    }

    const updateTotal = (cartList) => {
        let total = 0;

        cartList.forEach(cartItem => total = total + cartItem.price)

        localStorage.setItem("oldTotal", JSON.stringify(total))

        dispatch({
            type: "UPDATE_TOTAL",
            payload: {
                total
            }
        })

    }

    const value = {
        total: state.total,
        cartList: state.cartList,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}
