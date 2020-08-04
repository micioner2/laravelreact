import React from 'react';

function Table(props) {

    const { titleTable } = props
    
    return (
        <div className="box-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="table table-responsive">
                        <table className="table table-bordered table-striped" id="tabla">
                            <thead>
                                <tr>
                                    {
                                        titleTable.map((t, i) => (
                                            <th key={i}>{t}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     props.tBody()
                                
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Table;