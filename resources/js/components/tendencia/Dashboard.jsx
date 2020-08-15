import React, { useEffect, useState } from 'react';
import useFetch from '../peticiones/useFetch';

function Dashboard() {

    const [categoria, setCategoria] = useState({})
    const [producto, setProducto] = useState({})


    let categorias = useFetch('ruta/categoria', [])
    let productos = useFetch('ruta/producto', [])

    function getDatos() {
        if (categorias.loading || productos.loading ) {
            setCategoria(categorias.data)
            setProducto(productos.data)
        }
    }

    useEffect(() => {
        getDatos()
    }, [getDatos])



    return (
        <>
            <div className="box-header">
                <h3 className="box-title">DASHBOARD</h3>
            </div>
            <div className="box-body">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className={`info-box-icon bg-red`}><i className="fa fa-pencil"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">CATEGORIAS</span>
                                <span className="info-box-number">{categoria.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className={`info-box-icon bg-red`}><i className="fa fa-pencil"></i></span>
                            <div className="info-box-content">
                                <span className="info-box-text">PRODUCTOS</span>
                                <span className="info-box-number">{producto.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;