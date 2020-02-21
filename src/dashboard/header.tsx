import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { client } from '../services/apolloClient';

const Header = (props: any) => {
    const history = useHistory()
    const [toggleSideBar, setToggleSideBar] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        client.cache.reset();
        return history.push('/')
    }

    const MyAccountDash = ({isAdmin}: any) => {
        return (
            <>
            <div className="navbar-start forDesktop">
                <div className="navbar-item">
                    <label className="label has-text-white">AgileThought Employee Management</label>
                </div>
            </div>
            <div className="navbar-end" style={{ marginRight: "1em", marginTop: ".5em" }}>
            {isAdmin && <div className="navbar-item">
                    <button className="button is-primary" onClick={()=> {
                        history.push('/dashboard')
                    }}>
                        Dashboard
                    </button>
                    </div>}
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
            {!props.displayBackButton && <div className="navbar-menu is-active column has-background-black">
                <div className="navbar-item"><a href="ToggleSideBar" onClick={e => {
                    e.preventDefault();
                    setToggleSideBar(!toggleSideBar)
                    props.handleSideBarDisplay(!toggleSideBar)
                }}>
                    <i className="fas fa-bars is-size-4 has-text-primary"></i>
                </a>
                </div>
            </div>}
            <div className="navbar-item forDesktop">
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
        <div className="navbar-brand forDesktop" >
                    <a href="https://agilethought.com" className="navbar-item">
                        <img src='https://agilethought.com/wp-content/uploads/2019/08/logotype.png' />
                    </a>
                </div>
        {props.myAccount ? <MyAccountDash isAdmin={props.isAdmin}/> : <DashBoardNav/>}
    </nav>
)



}

export default Header