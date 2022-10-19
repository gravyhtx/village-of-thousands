import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Main from '../../components/admin/Main';
import Orders from '../../components/admin/Orders';

import { authCheck } from '../../utils/siteFunctions';
import {  } from 'react';
import LoginContainer from '../../components/LoginContainer';
import DefaultLayout from '../../templates/DefaultLayout';

const Admin = () => {
  const [page, setPage] = useState(null);

  const changePageLocation = (newPage) => {
    setPage(newPage)
  }

  const adminLogin =
  <div className="row container signup-container animate__animated animate__fadeIn login-container">
    <LoginContainer admin={true}/>
  </div>

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Main />;
      case "All-Orders":
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
      setPage('Home')
    }
  });

  const authRender = 
  <div className='reset-admin'>
    <Sidebar currentPage={page} pageChangeFn={changePageLocation} />
    <div className="main-admin-content">
      <Header />
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