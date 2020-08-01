import React, { useState, useEffect } from 'react';
import Swal from '../services/Swal';
import Paginate from '../services/Paginate';
import axios from 'axios';



const Categoria = () => {


    const [state, setState] = useState({ categorias: [], categoria: { nom_categoria: '' }, opcionModal: 1 })

    const getCategoria = () => {
        let arr = []
        axios.get('ruta/categoria').then(res => {
            arr = res.data
            setState({ ...state, categorias: arr })
            arr.length ? Paginate() : '';
        })
    }


    const regCategoria = () => {
        axios.post('ruta/categoria', state.categoria).then((res) => {
            if (res.status === 200) {
                getCategoria()
                Swal('success', 'OK', 'REGISTRO CORRECTO');
            }
        })
    }

    const editCategoria = () => {
        axios.put('ruta/categoria', state.categoria).then((res) => {
            if (res.status === 200) {
                getCategoria()
                Swal('success', 'OK', 'EDITADO CORRECTO');
            }
        })
    }

    const updCategoria = (data) => {
        console.log(data);
        axios.put('ruta/categoria/estado', data).then((res) => {
            if (res.status === 200) {
                getCategoria()
                Swal('success', 'OK', 'ESTADO ACTUALIZADO');
            }
        })
    }

    const onChange = (e) => {
        setState({ ...state, categoria: { ...state.categoria, nom_categoria: e.target.value } })
    }

    const abrirModal = (tipo, data) => {
        if (tipo === 'R') {
            setState({ ...state, categoria: { nom_categoria: '' }, opcionModal: 1 })
        } else {
            setState({ ...state, categoria: data, opcionModal: 0 })
        }
        $('#modal-categoria').modal('show');
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (state.categoria.nom_categoria) {
            state.opcionModal ? regCategoria() : editCategoria()
            $('#tabla').DataTable().destroy()
        }
    }


    useEffect(() => {

        getCategoria()

    }, [])



    return (
        <>

            <div className="box-header">
                <h3 className="box-title">CATEGORIA</h3> &nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={() => abrirModal('R')}><i className="fa fa-plus"></i>&nbsp; NUEVA CATEGORÍA</button>
            </div>

            {/*  */}

            <div className="box-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="table table-responsive">
                            <table className="table table-bordered table-striped" id="tabla">
                                <thead>
                                    <tr>
                                        <th>CATEGORÍA</th>
                                        <th>OPCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.categorias.map(c => (
                                            <tr key={c.id}>
                                                <td>{c.nom_categoria}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => abrirModal('', c)}><i className="fa fa-pencil"></i></button>
                                            &nbsp; &nbsp;
                                            <button className={c.estado ? 'btn btn-danger' : 'btn btn-success'} onClick={() => updCategoria(c)}><i className={c.estado ? 'fa fa-trash' : 'fa fa-check'}></i></button>
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

            <div className="modal fade" id="modal-categoria">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">X</span>
                            </button>
                            <h4 className="modal-title">{state.opcionModal ? 'REGISTRAR CATEGORIA' : 'EDITAR CATEGORIA'}</h4>
                        </div>
                        <form className="form" onSubmit={handleOnSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-th"></i></span>
                                                <input type="text" className="form-control input-lg" placeholder="INGRESE CATEGORIA" onChange={onChange} value={state.categoria.nom_categoria} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <button className="btn btn-default" data-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-primary pull-left">{state.opcionModal ? 'REGISTRAR' : 'EDITAR'}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Categoria;