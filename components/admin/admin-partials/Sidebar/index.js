import React from 'react'
import { MiCon } from '../../../icons/MatIco'

const Sidebar = ({currentPage, pageChangeFn}) => {
  return (
    <>
    <input type="checkbox" id="nav-admin-toggle"></input>
    <div className="sidebar-admin">
      <div className="sidebar-admin-brand">
        <h2><span className="lab la-accusoft"></span><span>VoT Dashboard</span></h2>
      </div>

      <div className="sidebar-admin-menu">
        <ul className='bootstrap-icons'>
          <li>
            <a href="#" className={currentPage == "Overview" ? "active" : "non-active"} onClick={()=>{pageChangeFn("Overview")}}>
              {/* <span className="bi bi-linkedin"></span> */}
              <MiCon classes={"dashboard"} name="Dashboard" icon={'dashboard'} />
              {}
              <span>Overview</span>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage == "All-Orders" ? "active" : "non-active"}
               onClick={()=>{pageChangeFn("All-Orders")}}>
              {/* <span className="bi bi-facebook"></span> */}
              <MiCon classes={"order"} name="Order" icon={'grading'} />
              <span>All Orders</span>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage == "Scumputor" ? "active" : "non-active"}
               onClick={()=>{pageChangeFn("Scumputor")}}>
              {/* <span className="bi bi-google"></span> */}
              <MiCon classes={"order"} name="Scumputor" icon={'laptop_mac'} />
              <span>Placeholder</span>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage == "Physical Events" ? "active" : "non-active"}
               onClick={()=>{pageChangeFn("Physical Events")}}>
              {/* <span className="bi bi-cart"></span> */}
              <MiCon classes={"order"} name={'loyalty'} />
              <span>Physical Events</span>
            </a>
          </li>
          <li>
            <a href="#" className={currentPage == "Print-Orders" ? "active" : "non-active"}
               onClick={()=>{pageChangeFn("Print-Orders")}}>
              {/* <span className="bi bi-clock"></span> */}
              <MiCon classes={"print"} name="Print Orders" icon={'print'} />
              <span>Print Orders</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Sidebar
