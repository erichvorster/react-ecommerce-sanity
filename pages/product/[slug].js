import React, {useState} from "react";
import {client, urlFor} from "../../lib/client"
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from "react-icons/ai"
import {useStateContext} from "../../context/StateContext"



// import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';


//The components props are retrieved in the getStaticProps function below
const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
      //1:41
  const [index, setIndex] = useState(0);

  //Importing state and function from our global context
  const { decQty, incQty, qty,} = useStateContext();

  // const handleBuyNow = () => {
  //   onAdd(product, qty);

  //   setShowCart(true);
  // }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">Add to Cart</button>
            <button type="button" className="buy-now" onClick="">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}


//getStaticPaths is another nextJS function
//Below we are only returning the current slug property
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}


//getStaticProps is another special Next.js function used to make network requests
//We get access to slug as arguments
//All of these values are delivered in this component as props - much like getServerSideProps in index.js
export const getStaticProps = async ({ params: { slug }}) => {
    //Fetch product details from the product page that we are currently on
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
     //Here we get the individual product
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails








