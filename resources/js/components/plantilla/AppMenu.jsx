import React from 'react';

const AppMenu = () => (

    <aside className="main-sidebar">
        <section className="sidebar">
            <ul className="sidebar-menu" data-widget="tree">
                <li className="header">MENU</li>
                <li>
                    <a href="#"><i className="fa fa-file-text-o" /> <span>INICIO</span></a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-book" /> <span>CATEGORIAS</span></a>
                </li>
                <li>
                    <a href="#"> <i className="fa fa-book" /> <span>PRODUCTOS</span></a>
                </li>
            </ul>
        </section>
    </aside>

)

export default AppMenu