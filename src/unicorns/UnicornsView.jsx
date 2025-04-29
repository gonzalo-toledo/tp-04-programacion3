import React, { Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UnicornContext } from "../context/UnicornContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
//! import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2';



const UnicornsView = () => {
    const {unicorns, loading,setEditingUnicorn, deleteUnicorn} = React.useContext(UnicornContext);
    const navigate = useNavigate();
    //! const toast = React.useRef(null);
    
    const handleEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
        navigate(`/unicornios/editar/${unicorn._id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUnicorn(id);
                Swal.fire(
                    '¡Eliminado!',
                    'El unicornio fue eliminado exitosamente.',
                    'success'
                );
            }
        });
    };

    const bodyActions = (rowData) => {
        return (
            <div className="p-d-flex p-gap-2">
                <Button     
                    label="Editar"
                    className="p-button-rounded p-button-success"
                    onClick={() => handleEdit(rowData)}
                    

                />
                <Button 
                    label="Eliminar"
                    className="p-button-rounded p-button-danger"
                    onClick={() => {
                        handleDelete(rowData._id);
                    }}
                />
            </div>
        );
    };


    return (
        <Fragment>

            <h1>Listado de unicornios</h1>

            {/* Tabla de datos */}
            <DataTable 
                header="Unicorns" 
                value={unicorns} 
                paginator 
                rows={10}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="custom-datatable"
                emptyMessage="No se encontraron unicornios"
            >
                <Column field="name" header="Nombre" sortable filter />
                <Column field="color" header="Color" sortable filter />
                <Column field="age" header="Edad" sortable />
                <Column field="power" header="Poder" sortable />
                <Column 
                    body={bodyActions} 
                    header="Acciones"
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                />
            </DataTable>

        </Fragment>
    );
};

export default UnicornsView;