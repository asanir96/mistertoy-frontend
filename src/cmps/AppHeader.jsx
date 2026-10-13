import { NavLink, useParams } from "react-router-dom"

export function AppHeader() {

    return <header className="header-layout">
        <h1>misterToys</h1>
        <nav className="app-nav">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/toy" >Toys</NavLink>
        </nav>

    </header>
}