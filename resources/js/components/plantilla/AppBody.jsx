import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Categoria from '../categoria/Categoria';
import Producto from '../producto/Producto';


const AppBody = () => (
    <div className="box box-primary">
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/categoria" component={Categoria} />
            <Route exact path="/producto" component={Producto} />
            <Route component={Error404} />
        </Switch>
    </div>
)


const Error404 = () => (
    <>
        <div className="box-header">
            <h3 className="box-title">Error de página</h3>
        </div>
        <div className="box-body">
            <p className="text-info text-red">Página no encontrada</p>
        </div>

    </>
)

export default AppBody