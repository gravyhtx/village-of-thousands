import React from 'react'

const Header = ({ name, user }) => {
  return (
    <header className='header-admin'>
        <h2>
          <label htmlFor="nav-toggle">
            <span className="las la-bars"></span>
          </label>

          // <span>{name.toUpperCase()}</span>
        </h2>
        {/* Not using this search bar */}
        {/* <div className="search-admin-wrapper">
          <span className="las la-search"></span>
          <input type="search" placeholder="Search here"></input>
        </div> */}

        {user ? <div className="user-admin-wrapper">
          {/* <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png" alt=""></img> */}
          <img src="https://cdn.discordapp.com/attachments/236763118032781313/1005245926635479060/unknown.png"></img>
          <div>
            <h4>{user ? "Welcome, "+user+"!" : ""}</h4>
            <small>administrator</small>
          </div>
        </div> : <></>}
        {/* <button onClick={information}>search</button> */}
      </header>
  )
}

export default Header
