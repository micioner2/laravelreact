import React from 'react';

const AppHeader = () => (

    <header className="main-header">
        <a href="#" className="logo">
            <span className="logo-mini"><b>S</b>I</span>
            <span className="logo-lg"><b>Sistema</b> Inventario</span>
        </a>
        <nav className="navbar navbar-static-top">
            <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
            </a>
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">

                    <li className="dropdown messages-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-envelope-o" />
                            <span className="label label-success">1</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="header">Tú tienes 1 mensaje</li>
                            <li>
                                <ul className="menu">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-shopping-cart text-green"></i> Tienes 3 productos pendientes
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="footer"><a href="#">Ver mensajes</a></li>
                        </ul>
                    </li>

                    <li className="dropdown user user-menu">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <img src="dist/img/hombre.png" alt="Usuario" className="user-image" alt="User Image" />
                            <span className="hidden-xs">usuario</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <img src="dist/img/hombre.png" alt="Usuario" className="img-circle" alt="User Image" />
                                <p>
                                    <small>2020</small>
                                </p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">
                                    <a href="logout" className="btn btn-default btn-flat">Salir</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

)

export default AppHeader