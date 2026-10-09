import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header>
        <nav className="app-nav">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/toy" >Toys</NavLink>
        </nav>
        <h1>misterToys</h1>
    </header>
}