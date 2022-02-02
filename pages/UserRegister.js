import { Collapsible, CollapsibleItem } from 'react-materialize';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavMobile from '../components/NavMobile';
import NavDesktop from '../components/NavDesktop';
import Login from '../components/Login';
import Register from '../components/Register';
import RandomQuote from '../components/modules/RandomQuote';

const UserRegisterCollapsible = () =>  {

    return (
        <div className="user-login-container">
            <Header />
            <NavMobile />
            <br/>
            <div className="row container signup-container animate__animated animate__fadeIn login-container">
            <div className='signup-collapsible'>
                <Collapsible
                    accordion
                >
                    <CollapsibleItem
                        expanded={false}
                        header={<div className="login-header disable-highlight">Login</div>}
                    >
                        <Login />
                    </CollapsibleItem>
                    <CollapsibleItem
                        className='login-collapsible-item'
                        expanded={true}
                        header={<div className="login-header disable-highlight">Register</div>}
                    >
                        <Register />
                    </CollapsibleItem>
                </Collapsible>
                </div>
                <div className="center-text italics"><RandomQuote className="center-text login-zen" type="zen" /></div>                
            </div>
            <NavDesktop />
            <Footer />
        </div>
    )
}

export default UserRegisterCollapsible;