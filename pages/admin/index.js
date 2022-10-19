import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Main from '../../components/admin/Main';
import Orders from '../../components/admin/Orders';

import { authCheck } from '../../utils/siteFunctions';
import {  } from 'react';
import LoginContainer from '../../components/LoginContainer';
import DefaultLayout from '../../templates/DefaultLayout';
import { hash, shortenHash, simpleHash } from '../../modules/hashSystem';
import { checkType, fileName, unFileName } from '../../utils/validation';
import { capitalize } from '@mui/material';
import { capitalizeWords } from '../../utils/generator';

const Admin = () => {
  const [page, setPage] = useState(null);
  const [user, setUser] = useState({name: '', email: ''});

  const allPages = ["Overview","All-Orders"]
  console.log(fileName('This Will be A filename!'))

  const changePageLocation = (newPage) => {
    setPage(newPage)
  }
  // const txt = "This is some data to encrypt";
  // const hashed = hash(txt, 'encrypt');
  // // const short = shortenHash(hashed);

  // console.log(simpleHash(txt));
  console.log(fileName(page))

  const adminLogin =
  <div className="row container signup-container animate__animated animate__fadeIn login-container">
    <LoginContainer admin={true}/>
  </div>

  const renderPage = () => {
    switch (page) {
      case "Overview":
        return <Main user={user} setUser={setUser} />;
      case "All-Orders":
        return <Orders fullPage={true}/>;
      case page !== null:
        return <Orders fullPage={true}/>;
      default:
        return adminLogin;
    }
  }
  
  useEffect(() => {
    // if(authCheck() === false) {
    //   window.location.href='/login';
    // }
    if(authCheck() === true && page === null) {
      setPage('Overview')
    }
  });

  const authRender = 
  <div className='reset-admin'>
    <Sidebar currentPage={page} pageChangeFn={changePageLocation} />
    <div className="main-admin-content">
      <Header name={page?unFileName(page):'Admin Login'} user={user.name} />
      <main className='main-admin'>
      {renderPage()}
      </main>
    </div>
  </div>

  return(
    <>
      {/* { !authCheck() ? <DefaultLayout title="Admin Login"><LoginContainer admin={true}/></DefaultLayout> : <></> } */}
      { authRender }
    </>
  )
}

module.exports = Admin;