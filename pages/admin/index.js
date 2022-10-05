import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Main from '../../components/admin/Main';
import Orders from '../../components/admin/Orders';

import { authCheck } from '../../utils/siteFunctions';
import {  } from 'react';

const Admin = () => {
  const [page, setPage] = useState("Home");

  const changePageLocation = (newPage) => {
    setPage(newPage)
  }

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Main />
      case "All-Orders":
        return <Orders fullPage={true}/>
    }
  }
  
  useEffect(() => {
    if(authCheck() === false) {
      window.location.href='/login';
    }
  });


  return(
    <>
      { authCheck() ?
        <div className='reset-admin'>
          <Sidebar currentPage={page} pageChangeFn={changePageLocation} />
          <div className="main-admin-content">
            <Header />
            <main className='main-admin'>
              {renderPage()}
            </main>
          </div>
        </div>
      : <></> }
    </>
  )
}

module.exports = Admin;