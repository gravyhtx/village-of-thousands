import Link from "next/link";
import { Button, Icon } from 'react-materialize';
import Auth from '../utils/auth';

const NavMobile = () => {

    const account = Auth.loggedIn() ? "/account" : "/login";

    return (
        <div className="mobile-nav mobile">

            <div className="col s3 nav-mobile-col">
            <Link to={account}>
            <Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>person</Icon>}
                node="button"
            />
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/products">
            <Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>remove_red_eye</Icon>}
                node="button"
            />
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/faq">
            <Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>all_inclusive</Icon>}
                node="button"
            />
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/cart">
            <Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>shopping_cart</Icon>}
                node="button"
            />
            </Link>
            </div>

        </div>
    );
}

export default NavMobile;