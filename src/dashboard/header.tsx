import React, { useState, useEffect } from 'react';


const Header = (props: any) => {
    const [toggleSideBar, setToggleSideBar] = useState(false);


    return (
        <nav className="navbar is-fixed-top columns" aria-label="dashboard filter">
            <div className="navbar-menu is-active column">
                <a href="ToggleSideBar" onClick={e => {
                    e.preventDefault();
                    setToggleSideBar(!toggleSideBar)
                    props.handleSideBarDisplay(!toggleSideBar)
                }}>
                    <i className="fas fa-frown"></i>
                </a>
                    {/* {displayDropDown()} */}
            </div>
        </nav>
    )



}

export default Header