import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const Header = (props: any) => {
    const history = useHistory()
    const [toggleSideBar, setToggleSideBar] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        return history.push('/')
    }

    const MyAccountDash = (isAdmin: any) => {
        return (
            <>
            <div className="navbar-start">
                <div className="navbar-item">
                    <label className="label has-text-white">AgileThought Employee Management</label>
                </div>
                {isAdmin && <div className="navbar-item">
                    <button className="button is-primary" onClick={()=> {
                        history.push('/dashboard')
                    }}>
                        Dashboard
                    </button>
                    </div>}
            </div>
            <div className="navbar-end" style={{ marginRight: "1em", marginTop: ".5em" }}>
            <div className="navbar-item">
                <button className="button is-danger" onClick={() => {
                    handleSignOut();
                }}>
                    Log out
                </button>
            </div>
        </div>
            </>
        )
    }


    const DashBoardNav = () => {
        return (
            <>
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
                <label className="label has-text-white">AgileThought Employee Management</label>
            </div>
        </div>
        <div className="navbar-end" style={{ marginRight: "1em", marginTop: ".5em" }}>
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
            <div className="navbar-item">
                <button className="button is-primary" onClick={()=> {
                        history.push('/myaccount')
                    }}>
                        Account
                    </button>
            </div>
            <div className="navbar-item">
                <button className="button is-danger" onClick={() => {
                    handleSignOut();
                }}>
                    Log out
                </button>
            </div>
        </div>
        </>
        )
    }

return (
    <nav className="navbar is-fixed-top columns has-background-black" role="navigation" aria-label="dashboard filter">
        {props.myAccount ? <MyAccountDash isAdmin={props.isAdmin}/> : <DashBoardNav/>}
    </nav>
)



}

export default Header