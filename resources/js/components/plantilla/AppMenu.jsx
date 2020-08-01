import React from 'react';
import { NavLink } from 'react-router-dom';

const AppMenu = () => (

    <aside className="main-sidebar">
        <section className="sidebar">
            <ul className="sidebar-menu" data-widget="tree">
                <li className="header">MENU</li>
                <li>
                    <NavLink exact to="/" activeClassName="activo"> 
                        <i className="fa fa-file-text-o" /> <span>INICIO</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/categoria" activeClassName="activo">
                        <i className="fa fa-book" /> <span>CATEGORIAS</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/producto" activeClassName="activo">
                        <i className="fa fa-book" /> <span>PRODUCTOS</span>
                    </NavLink>
                </li>
            </ul>
        </section>
    </aside>

)

export default AppMenu