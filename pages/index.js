import React from 'react';
import {useUser} from '@auth0/nextjs-auth0'
import {Auth0Provider} from '@auth0/auth0-react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';


const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_CLIENT_ID
//const { user, error, isLoading } = useUser();



const Home = ({ products, bannerData }) => (
  
  <div>
  
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery); 

  return {
    props: { products, bannerData }
  }

}



export default Home;