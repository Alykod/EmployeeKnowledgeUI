import React, { useState, useEffect } from 'react';


const Header = (props: any) => {
    const [toggleSideBar, setToggleSideBar] = useState(false);


    return (
        <nav className="navbar is-fixed-top columns has-background-black" role="navigation" aria-label="dashboard filter">
            <div className="navbar-start">
                {!props.displayBackButton && <div className="navbar-menu is-active column">
                    <div className="navbar-item"><a href="ToggleSideBar" onClick={e => {
                        e.preventDefault();
                        setToggleSideBar(!toggleSideBar)
                        props.handleSideBarDisplay(!toggleSideBar)
                    }}>
                        <i className="fas fa-bars is-size-4 has-text-primary"></i>
                    </a>
                    </div>
                </div>}
                <div className="navbar-item">
                    <label className="label has-text-white">AgileThought Employee Manager</label>
                </div>
            </div>
            <div className="navbar-end" style={{marginRight: "1em", marginTop: ".5em"}}>
                {props.displayBackButton &&
                    <>
                        <div className="navbar-item">
                            <label className="label  has-text-white">Back To Dashboard</label>
                        </div>
                        <div className="navbar-item">
                            <a href="GoBack" onClick={e => {
                                e.preventDefault();
                                props.toggleBack()
                            }}>
                                <i className="fas fa-undo is-size-4 has-text-primary"></i>
                            </a>
                        </div>
                    </>
                }
            </div>
        </nav>
    )



}

export default Header