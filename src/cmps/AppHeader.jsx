import { useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import {UserMenu} from '../cmps/UserMenu'

export function AppHeader() {
    const user = useSelector(storedState => storedState.authModule.user)
    console.log('user', user)
    return <header className="header-layout">
        <h1>misterToys</h1>
        <nav className="app-nav">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/toy" >Toys</NavLink>
            <NavLink to="/dashbord" >Dashbord</NavLink>
            <NavLink to="/review" >Reviews</NavLink>
            <UserMenu/> 
        </nav>


    </header>
}