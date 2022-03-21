import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../templates/DefaultLayout";
import { useRouter } from "next/router";

import votHeader from '../../public/images/header.svg';

import { accountActivation, getPendingUser } from "../../utils/API";
import withAuth from '../../utils/withAuth';

const Activate = () => {
  // const [ activationId, setActivationId ] = useState('');
  const router = useRouter();
  const slug = router.query.slug;

  const [pendingUser, setPendingUser] = useState([]);

  useEffect(() => {
    const loadPendingUser = async () => {
      try {
        const userExists = await getPendingUser(slug);
        console.log(userExists);
        
        if(!userExists) {
          console.log('user does not exist')
          return
        }
        const user = await userExists.json()
        console.log(user, slug)
        const activate = await accountActivation(slug);

        
        if(!activate) {
          console.log('activation error at slug js')
          return
        }

        setPendingUser(userExists)
      } catch (err) {
        console.error(err)
      }
    }

    loadPendingUser();
  }, [])

  const Content = () => {
      return (
        <>
        {pendingUser.length ? (
          <div> Welcome to the jungle</div>
          ): (
          <div>
          {/* This is a slug. The slug is {slug}. */}
          Click here to resend activation email.
          </div>
        )}
        </>
      )
  };
  
  return (
    <DefaultLayout>
      <div className="index-section activation-page center">
        <Content />
        <Link href="/"><a>
          <p className="link cart-view-products">GO HOME</p>
        </a></Link>
      </div>
    </DefaultLayout>
  );
}

// export default withAuth(Activate);
export default Activate;