import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext';


const ProductDetails = ({ product, products }) => {
    // console.log(product);

    const { name, image, details, price } = product;
    const [index, setIndex] = useState(0);
    const { qty, incQty, decQty, onAdd, setShowCart } = useStateContext();

    const buyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }


    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img src={urlFor(image && image[index])} className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
                        {
                            image.map((item, i) => (

                                <img
                                    key={i}
                                    src={urlFor(item)}
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={() => setIndex(i)}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>{details}</h4>
                    <p className='price'>₹ {price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num' onClick="">{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
                        <button className='buy-now' onClick={() => buyNow()}>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className='maylike-products-wrapper'>
                <h2>You may also like </h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export const getStaticPaths = async () => {

    const pathQuery = `*[_type == "product"]{
        slug {
            current
        }
    }`;

    const products = await client.fetch(pathQuery);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
};

export const getStaticProps = async ({ params: { slug } }) => {

    const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch(productQuery);
    const products = await client.fetch(productsQuery);


    return {
        props: {
            product,
            products
        }
    }

}

export default ProductDetails