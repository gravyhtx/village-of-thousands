import Link from "next/link";
import { Icon } from '@mui/material';
import Auth from '../utils/auth';
import { useEffect, useState } from "react";

const TopNav = () => {

  const account = Auth.loggedIn() ? "/account" : "/login";

  const navlinks = [
    { name: "account", ref: "person", link: account, },
    { name: "products", ref: "remove_red_eye", link: "/shop" },
    { name: "faq", ref: "all_inclusive", link: "/faq" },
    { name: "cart", ref: "shopping_cart", link: "/cart" }
  ];

  return (
    <div className="top-nav disable-highlight row">
      {navlinks.map((item, index) =>
          <div className="col s3 nav-top-col" key={index}>
            <Link href={item.link}><a suppressHydrationWarning>
              <button
                color="inherit"
                className={"btn-floating btn-floating navigation-link nav-"+item.name}
              ><Icon className="material-Icons nav-icon">{item.ref}</Icon></button>
            </a></Link>
          </div>
      )}
    </div>
  );
}

export default TopNav;