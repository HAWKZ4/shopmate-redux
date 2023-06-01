import "./ProductCard.css";
import { add, remove } from "../store/cartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";



export const ProductCard = ({ product }) => {
  const { name, price, image, id } = product;
  const dispatch = useDispatch()
  const products = useSelector(state => state.cartState.cartList);
  const [InCart, setInCart] = useState(false)

  useEffect(() => {
    const inTheCart = products.find(cartItem => cartItem.id === id);
    if (inTheCart) {
      setInCart(true)
    } else {
      setInCart(false)
    }
  }, [products, id])

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {InCart ? (<button className="remove" onClick={() => dispatch(remove(product))}>Remove</button>) : (<button onClick={() => dispatch(add(product))}>Add To Cart</button>)}

      </div>
    </div>
  )
}
