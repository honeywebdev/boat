import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Banner = ({ bannerdta }) => {
    return (
        <div className='hero-banner-container'>

            <div>
                <p className='beats-solo'>{bannerdta.product}</p>
                <h3>{bannerdta.midText}</h3>
                <h1>{bannerdta.largeText1}</h1>
                <img src={urlFor(bannerdta.image)} alt="speakers" className='hero-banner-image' />

                <div>
                    <Link href={`/product/${bannerdta.product}`}>
                        <button type='button'>{bannerdta.buttonText}</button>
                    </Link>

                    <div className='desc'>
                        <p>{bannerdta.desc}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner