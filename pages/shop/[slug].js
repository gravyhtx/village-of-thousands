import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Auth from '../../utils/auth';
import { getAllCategories } from '../../utils/API';
import { capitalize } from "../../utils/generator";

import DefaultLayout from "../../templates/DefaultLayout";

import ProductImage from "../../components/ProductImage";

const Products = () => {
  const [loggedIn, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({ category_name: "", products: [], tags: [], _id: "" });

  const slug = router.query.slug;

  useEffect(() => {
    const getProductData = async () => {
      try {
        const profile = Auth.loggedIn() ? Auth.getProfile() : null;
        
        if(profile) {
          setLogged(true)
        }
        const response = await getAllCategories();
        const productInfo = await response.json()
        setAllProducts(productInfo);
        if(allProducts) {
          setLoaded(true)
        }
        
      } catch (err) {
          console.error(err);
      }
    }
    getProductData();
  }, []);

  useEffect(() => {
    const cat = allProducts.filter(function(el){
      return el.category_name === slug;
    })
    setCategory(cat ? cat[0] : {});
    setProducts(category ? category.products : [])
  }, [!allProducts.length]);

  console.log(products);

  return (
    <DefaultLayout title={"Shop" + (category ? " " + capitalize(category.category_name) : "")}>{/* <DefaultLayout headerImages={headerImages}> */}
      <div className="activate-page center container animate__animated animate__fadeIn">
        {category ? 
          <h1>
            {category.category_name.toUpperCase()}
          </h1>
        : <></> }
        <div className="row">
          {loaded && products.length ?
            <ProductImage colorId={1} name={products[1].product_name} filename={products[1].product_path} />
          : <></>}
            {/* <ProductCard productElement={productElement} loggedIn={loggedIn} /> */}
        </div>
        {/* } */}
      </div>
    </DefaultLayout>
  );
}

export default Products;