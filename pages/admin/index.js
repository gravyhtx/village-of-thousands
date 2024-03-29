import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/admin-partials/Sidebar';
import Header from '../../components/admin/admin-partials/Header';
import Main from '../../components/admin/admin-views/Main';
import Orders from '../../components/admin/admin-views/Orders';
import Events from '../../components/admin/admin-views/Events';
import PrintAll from '../../components/admin/Print/PrintAll';

import { authCheck } from '../../utils/siteFunctions';
import {  } from 'react';
import LoginContainer from '../../components/LoginContainer';
// import { hash, shortenHash, simpleHash } from '../../modules/hashSystem';
import { checkType, fileName, unFileName } from '../../utils/validation';

const Admin = () => {
  const [page, setPage] = useState(null);
  const [user, setUser] = useState({name: '', email: ''});

  const allPages = ["Overview","All-Orders","Print-Orders"]
  // console.log(fileName('This Will be A filename!'))

  const changePageLocation = (newPage) => {
    setPage(newPage)
  }

  const adminLogin =
  <div className="row container signup-container animate__animated animate__fadeIn login-container">
    <LoginContainer admin={true}/>
  </div>

  let login = false;

  const renderPage = () => {
    switch (page) {
      case "Overview":
        login = false;
        return <Main user={user} setUser={setUser} />;
      case "All-Orders":
        return <Orders fullPage={true} />;
      case "Print-Orders":
        login = false;
        return <PrintAll fullPage={true}/>;
      case "Physical Events":
        return <Events fullPage={true} />
      case page !== null:
        return <Orders fullPage={true} />;
      default:
        login = true;
        return adminLogin;
    }
  }
  
  useEffect(() => {
    if(authCheck() === true && page === null) {
      setPage('Overview')
    }
  });

  const authRender = page !== 'Print-Orders' ?
  <div className='reset-admin'>
    <Sidebar currentPage={page} pageChangeFn={changePageLocation} />
    <div className="main-admin-content">
      <Header name={page?unFileName(page):'Admin Login'} user={user.name} />
      <main className='main-admin'>
      {renderPage()}
      </main>
    </div>
  </div> : <PrintAll login={login} />

  return authRender;
}

module.exports = Admin;