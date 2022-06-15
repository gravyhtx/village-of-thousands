import Link from "next/link";
import { Icon } from '@mui/material';
import Auth from '../utils/auth';
import { useRouter } from "next/router";

const TopNav = () => {

  const logged = Auth.loggedIn();
  const account = logged ? "/account" : "/login";
  const location = useRouter().pathname

  const navlinks = [
    { name: "Account", ref: "person", link: account, alt: logged ? "Go to your Account" : "Go to Login page" },
    { name: "Shop", ref: "remove_red_eye", link: logged ? "/shop" : "/products", alt: logged ? "Shop Products in Our Current SZN" : "Learn about Our Products" },
    { name: "FAQ", ref: "all_inclusive", link: "/faq", alt: "Go to the FAQ - and Frequently Ask Questions!" },
    { name: "Cart", ref: "shopping_cart", link: "/cart", alt: "View your Cart" }
  ];

  return (
    <div className={"top-nav disable-highlight row"+(location === '/' ? ' home': '')} role="navigation" aria-label="Site Navigation" id="top-nav">
      {navlinks.map((item, index) =>
          <Link href={item.link} key={index}><a alt={item.alt} suppressHydrationWarning>
            <div className="col s3 nav-top-col">
                <button alt= {item.name}
                  color="inherit"
                  className={"btn-floating navigation-link nav-"+item.name.toLowerCase()}
                ><Icon className="material-Icons nav-icon">{item.ref}</Icon></button>
            </div>
          </a></Link>
      )}
    </div>
  );
}

export default TopNav;