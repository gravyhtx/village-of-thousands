import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Main from '../../components/admin/Main';

const Admin = () => {
  const [page, setPage] = useState("Home");

  const changePageLocation = (newPage) => {
    setPage(newPage)
  }

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <Main />
    }
  }

  return(
    <>
      <div className='reset-admin'>
        <Sidebar currentPage={page} pageChangeFn={changePageLocation} />
        <div className="main-admin-content">
          <Header />
          <main className='main-admin'>
            {renderPage()}
          </main>
        </div>
      </div>
    </>
  )
}

module.exports = Admin;