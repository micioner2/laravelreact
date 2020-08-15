import React, { useState, useEffect, useRef } from 'react';
import Swal from '../services/Swal';
import Paginate from '../services/Paginate';
import axios from 'axios';
import Header from '../componentes/Header';
import Table from '../componentes/Table';
import Modal from '../componentes/Modal';


const Categoria = () => {


    const [state, setState] = useState({ categorias: [], categoria: { nom_categoria: '' }, opcionModal: 1 })
    const montado = useRef(false)
    const title = "CATEGORIA"

    const getCategoria = () => {
        let arr = []
        axios.get('ruta/categoria').then(res => {
            if (!montado.current) {
                arr = res.data
                setState({ ...state, categorias: arr })
                arr.length ? Paginate() : '';
            }
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

    const titleTable = ['CATEGORIA', 'ESTADO', 'OPCIONES']

    const tBody = () => {
        return (
            state.categorias.map(a => (
                <tr key={a.id}>
                    <td>{a.nom_categoria}</td>
                    <td><span className={a.estado ? 'label label-primary' : 'label label-danger'}>{a.estado ? 'ACTIVO' : 'DESACTIVADO'}</span></td>
                    <td>
                        <button className="btn btn-primary" onClick={() => abrirModal('', a)}><i className="fa fa-pencil"></i></button>
                    &nbsp; &nbsp;
                    <button className={a.estado ? 'btn btn-danger' : 'btn btn-success'} onClick={() => updCategoria(a)}><i className={a.estado ? 'fa fa-trash' : 'fa fa-check'}></i></button>
                    </td>
                </tr>
            ))
        )
    }

    const Form = () => {
        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-th"></i></span>
                    <input type="text" className="form-control input-lg" placeholder="INGRESE CATEGORIA" onChange={onChange} value={state.categoria.nom_categoria} />
                </div>
            </div>
        )
    }

    useEffect(() => {

        getCategoria()

        return () => {
            montado.current = true
        }
    }, [])



    return (
        <>

            <Header title={title} subTitle={'NUEVA '+`${title}`} abrirModal={abrirModal} />
            <Table titleTable={titleTable} tBody={tBody} />
            <Modal id="modal-categoria" title={title} 
                handleOnSubmit={handleOnSubmit} form={Form} opcion={state.opcionModal} />
        </>
    );
}

export default Categoria;