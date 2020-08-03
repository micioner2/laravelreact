import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from '../services/Swal'
import Paginate from '../services/Paginate';
function Producto() {

    const [state, setState] = useState({
        productos: [],
        producto: {
            id_categoria: 0,
            nom_producto: ''
        },
        opcionModal: 1
    })

    const montado = useRef(false)
    const [categoria, setCategoria] = useState({ categorias: [] })

    const getProducto = () => {
        let arr = []
        axios.get('ruta/producto').then(res => {
            if (!montado.current) {
                arr = res.data;
                setState({ ...state, productos: arr })
                arr.length ? Paginate() : ''
            }
        })
    }

    const getCategoria = () => {
        let arr = []
        axios.get('ruta/categoria').then(res => {
            if (!montado.current) {
                arr = res.data
                setCategoria({ categorias: arr.filter(c => c.estado) })
            }
        })
    }

    const regProducto = () => {
        let url = 'ruta/producto';
        axios.post(url, state.producto).then((res) => {
            if (res.status === 200) {
                Swal('success', 'OK', 'PRODUCTO REGISTRADO')
                getProducto()
            }
        })
    }

    const editProducto = () => {
        let url = 'ruta/producto'
        axios.put(url, state.producto).then((res) => {
            if (res.status === 200) {
                Swal('success', 'OK', 'PRODUCTO EDITADO')
                getProducto()
            }
        })
    }


    const updProducto = (data) => {
        let url = 'ruta/producto/estado'
        axios.put(url, data).then((res) => {
            if (res.status === 200) {
                Swal('success', 'OK', 'ESTADO ACTUALIZADO')
                getProducto()
            }
        })
    }

    const onChangeNomProducto = (event) => {
        setState({ ...state, producto: { ...state.producto, nom_producto: event.target.value } })
    }

    const onChangeIdCategoria = (event) => {
        setState({ ...state, producto: { ...state.producto, id_categoria: event.target.value } })
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if (state.producto.id_categoria != 0 && state.producto.nom_producto != '') {
            state.opcionModal ? regProducto() : editProducto()
            $('#tabla').DataTable().destroy()
        }
    }

    function abrirModal(type, data) {
        if (type === 'R') {
            setState({ ...state, opcionModal: 1, producto: { id_categoria: 0, nom_producto: '' } })
        } else {
            setState({ ...state, opcionModal: 0, producto: data })
        }
        $('#modal-producto').modal('show');

    }

    useEffect(() => {
        getProducto()
        getCategoria()
        return () => {
            montado.current = true
        }

    }, [])



    return (
        <>
            <div className="box-header">
                <h3 className="box-title">PRODUCTO</h3> &nbsp;&nbsp;
            <button className="btn btn-primary" onClick={() => abrirModal('R')}><i className="fa fa-plus"></i>&nbsp;&nbsp;NUEVO PRODUCTO</button>
            </div>

            <div className="box-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table table-responsive">
                            <table className="table table-bordered table-striped" id="tabla">
                                <thead>
                                    <tr>
                                        <th>CATEGORIA</th>
                                        <th>PRODUCTO</th>
                                        <th>ESTADO</th>
                                        <th>OPCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.productos.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.nom_categoria}</td>
                                                <td>{p.nom_producto}</td>
                                                <td><span className="label label-primary">ACTIVO</span></td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => abrirModal('', p)}><i className="fa fa-pencil"></i></button>
                                                    &nbsp;&nbsp;
                                                    <button className={p.estado ? 'btn btn-danger' : 'btn btn-success'} onClick={() => updProducto(p)}><i className={p.estado ? 'fa fa-trash' : 'fa fa-check'}></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            {/*  */}

            <div className="modal fade" id="modal-producto">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                            <h4 className="modal-title">{state.opcionModal ? 'REGISTRAR PRODUCTO' : 'EDITAR PRODUCTO'}</h4>
                        </div>
                        <form className="form" onSubmit={handleOnSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input input-group-addon"><i className="fa fa-th"></i></span>
                                                <select className="form-control input-lg" onChange={onChangeIdCategoria} value={state.producto.id_categoria}>
                                                    <option value="0" disabled>SELECCIONE CATEGORIA</option>
                                                    {
                                                        categoria.categorias.map(c => (
                                                            <option key={c.id} value={c.id}>{c.nom_categoria}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input input-group-addon"><i className="fa fa-th"></i></span>
                                                <input type="text" className="form-control input-lg" onChange={onChangeNomProducto} value={state.producto.nom_producto} placeholder="INGRESE NOMBRE DE PRODUCTO" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary pull-left">{state.opcionModal ? 'REGISTRAR' : 'EDITAR'}</button>
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Producto;