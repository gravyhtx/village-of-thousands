import React from 'react'

const Sidebar = ({currentPage, pageChangeFn}) => {
  return (
    <>
    <input type="checkbox" id="nav-admin-toggle"></input>
    <div className="sidebar-admin">
      <div className="sidebar-admin-brand">
        <h2><span className="lab la-accusoft"></span><span>VOT Dashboard</span></h2>
      </div>

      <div className="sidebar-admin-menu">
        <ul className='bootstrap-icons'>
          <li>
            <a href="#" className={currentPage == "Home" ? "active" : "non-active"} onClick={()=>{pageChangeFn("Home")}}>
              <span className="bi bi-linkedin"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="bi bi-facebook"></span>
              <span>Placeholder</span>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage == "Raids" ? "active" : "non-active"} onClick={()=>{pageChangeFn("Raids")}}>
              <span className="bi bi-google"></span>
              <span>Placeholder</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="bi bi-cart"></span>
              <span>Placeholder</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="bi bi-clock"></span>
              <span>Placeholder</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Sidebar
