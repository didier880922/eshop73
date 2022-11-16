import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

const baseURL = "http://localhost:30000";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantify = existItem ? existItem.quantify + 1: 1;
    const { data } = await axios.get(`${baseURL}/api/products/${item._id}`);
    if (data.countInStock < quantify ) {
      window.alert('El producto esta fuera de stock');
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantify },
    });
  }

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews= {product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <Button className="" onClick={() => addToCartHandler(product)} >Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;