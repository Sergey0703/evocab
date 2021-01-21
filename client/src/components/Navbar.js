import React, {useContext, Fragment} from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
//<nav className="navbar navbar-dark navbar-expand-lg bg-primary" >
//<div className="navbar-brand">
//    Note App
//</div>
export const Navbar=()=>{
    const history=useHistory()
    const auth=useContext(AuthContext)
    const logoutHandler=event=>{
    event.preventDefault()
    auth.logout()
    history.push('/')
    }
    return(
     <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top ">

            <div className="myclass1">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

            </div>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
     <ul className="navbar-nav mr-auto"  >
         <li className="nav-item "><NavLink className="nav-link" to="/create" exact>Create </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/trainwords" exact>Train words </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/trainwords2" exact>Train words2 </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/trainsound" exact>Train sound </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/vocab" exact>Vocab </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/admin" exact>Admin </NavLink></li>
         <li className="nav-item "><NavLink className="nav-link" to="/about" exact>About </NavLink></li>
         <li className="nav-item "><a href="/" onClick={logoutHandler} className="nav-link">Log out </a></li>

     </ul>
            </div>
        </nav>
</div>
    )
}

