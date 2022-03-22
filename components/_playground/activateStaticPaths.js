//------------------------------//
//   MUST USE [id] NOT [slug]   //
//------------------------------//

import React from "react";
import Link from "next/link";
import useRouter from "next/router";
// import DefaultLayout from "../../templates/DefaultLayout";

export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  const paths = data.map(user => {
    return {
      params: { id: user.id.toString() }
    }
  });
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
  const data = await res.json();

  return {
    props: { user: data }
  }
}

const Activate = ({ user }) => {

  const router = useRouter();
  const { pid } = router.query;

  return (
    // <DefaultLayout>
      <div className="main-conten animate__animated animate__fadeIn" id="content">
        <div className="index-section animate__animated animate__fadeIn cart-page">
          {/* <h1 className="center cart-header">Cart</h1> */}
          <div className="cart center">
            <div className="empty-cart center">
              <p>This is a slug!!</p>
              <Link href="/"><a>
              <p className="link cart-view-products">GO HOME</p>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    // </DefaultLayout>
  );
}

export default Activate;