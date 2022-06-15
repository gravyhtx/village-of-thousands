import { useState } from "react";
import Link from "next/link";
import { Icon } from "@mui/material";
import Auth from "../utils/auth";

const NavDesktop = () => {

  const account = Auth.loggedIn() ? "/account" : "/login";
  const navlinks = [
    { name: "account", ref: "person", link: account, },
    { name: "products", ref: "remove_red_eye", link: "/shop" },
    { name: "faq", ref: "all_inclusive", link: "/faq" },
    { name: "cart", ref: "shopping_cart", link: "/cart" }
  ];

  const fingerprint = <Icon className="avatar">fingerprint</Icon>;

  return (
    <div className="nav-desktop">
      <button className="nav-fab btn-floating btn-large">{fingerprint}</button>
      <ul className="row nav-links">
        {navlinks.map((item, index) =>
          <li className="col s3 nav-link" key={index}>
            <Link href={item.link}><a>
              <button
                color="inherit"
                className={"btn-floating navigation-link nav-"+item.name}
              ><Icon className="material-Icons nav-icon">{item.ref}</Icon></button>
            </a></Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NavDesktop;