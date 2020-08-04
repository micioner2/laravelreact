import React from 'react';

function Modal(props) {

    const { id, title, opcion } = props
    return (
        <div className="modal fade" id={id}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">X</span>
                        </button>
                        <h4 className="modal-title">{opcion ? 'REGISTRAR ' + title : 'EDITAR ' + title}</h4>
                    </div>
                    <form className="form" onSubmit={props.handleOnSubmit}>
                        <div className="modal-body">
                            {props.form()}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary pull-left">{opcion ? 'REGISTRAR' : 'EDITAR'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;