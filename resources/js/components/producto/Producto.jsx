import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from '../services/Swal'
import Paginate from '../services/Paginate';
import Header from '../componentes/Header';
import Table from '../componentes/Table';
import Modal from '../componentes/Modal';


function Producto() {

    const [state, setState] = useState({
        productos: [],
        producto: {
            id_categoria: 0,
            nom_producto: ''
        },
        opcionModal: 1
    })
    const [categoria, setCategoria] = useState({ categorias: [] })

    const [search, setSearch] = useState({ searchProducto: [] })

    const montado = useRef(false)
    const title = "PRODUCTO"



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
        getSearch(event.target.value)
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

    const getSearch = (name) => {
        let arr = []
        axios.get('ruta/producto/search?search=' + name).then(res => {
            arr = res.data
            setSearch({ searchProducto: arr })
        })
    }

    const clickSearch = (name) => setState({ ...state, producto: { ...state.producto, nom_producto: name } })

    function abrirModal(type, data) {
        if (type === 'R') {
            setState({ ...state, opcionModal: 1, producto: { id_categoria: 0, nom_producto: '' } })
        } else {
            setState({ ...state, opcionModal: 0, producto: data })
            getSearch(data.nom_producto)
        }
        $('#modal-producto').modal('show');
    }

    const titleTable = ['CATEGORIA', 'PRODUCTO', 'ESTADO', 'OPCIONES']


    const tBody = () => {
        return (
            state.productos.map(p => (
                <tr key={p.id}>
                    <td>{p.nom_categoria}</td>
                    <td>{p.nom_producto}</td>
                    <td><span className={p.estado ? 'label label-primary' : 'label label-danger'}>{p.estado ? 'ACTIVO' : 'DESACTIVADO'}</span></td>
                    <td>
                        <button className="btn btn-primary" onClick={() => abrirModal('', p)}><i className="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                        <button className={p.estado ? 'btn btn-danger' : 'btn btn-success'} onClick={() => updProducto(p)}><i className={p.estado ? 'fa fa-trash' : 'fa fa-check'}></i></button>
                    </td>
                </tr>
            ))
        )
    }

    const Form = () => {
        return (
            <>
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
                    <div className="list-group">
                        {
                            state.producto.nom_producto.length ?
                                // search.searchs.filter(p => p.nom_producto.includes(state.producto.nom_producto.toUpperCase())).map(pr => (
                                //     <a href="#" className="list-group-item list-group-item-action border-1" key={pr.id}>
                                //         {pr.nom_producto}
                                //     </a>
                                // ))

                                search.searchProducto.map(pr => (
                                    <a href="#" className="list-group-item list-group-item-action" key={pr.id}
                                        onClick={() => clickSearch(pr.nom_producto)}>
                                        {pr.nom_producto}
                                    </a>
                                ))
                                : ''
                        }
                    </div>

                </div>
            </>
        )
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
            <Header title={title} subTitle={'NUEVO ' + `${title}`} abrirModal={abrirModal} />

            <Table titleTable={titleTable} tBody={tBody} />

            <Modal id="modal-producto" handleOnSubmit={handleOnSubmit} title={title} form={Form} opcion={state.opcionModal} />

        </>
    );
}

export default Producto;