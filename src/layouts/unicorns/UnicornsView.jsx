import React, { Fragment } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useState } from "react";

// importar:
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Button } from "primereact/button";



const UnicornsView = ({ 
    unicorns, 
    loading, 
    error, 
    onDelete, 
    onEdit,
    onCreate,
    onSaveEdit,
    editingUnicorn,    
}) => {
    const toast = React.useRef(null);

    //primero definir initialValues 
    const initialValues = {
        name: editingUnicorn?.name || '',
        color: editingUnicorn?.color || '',
        age: editingUnicorn?.age || '',
        power: editingUnicorn?.power || '',
    }

    // definir el esquema de validacion
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'El nombre es muy corto')
            .max(50, 'El nombre es muy largo') 
            .required('El nombre es requerido'),
        color: Yup.string()
            .required('El color es requerido'),
        age: Yup.number()
            .required('La edad es requerida'),
        power: Yup.string()
            .required('El poder es requerido')
    });


    const bodyActions = (rowData) => {
        return (
            <div className="p-d-flex p-gap-2">
                <Button     
                    label="Editar"
                    className="p-button-rounded p-button-success"
                    onClick={() => onEdit(rowData)}
                />
                <Button 
                    label="Eliminar"
                    className="p-button-rounded p-button-danger"
                    onClick={() => {
                        if(window.confirm('¿Eliminar este unicornio?')) {
                            onDelete(rowData._id);
                        }
                    }}
                />
            </div>
        );
    };


    if (error) {
        return <div className="p-m-4 p-d-inline-flex p-ai-center">
            <i className="pi pi-exclamation-triangle p-mr-2" />
            <span>Error: {error}</span>
        </div>;
    }
    
    console.log("initialValues", initialValues);
    return (
        <Fragment>
            <Toast ref={toast} />
            <h1>Challenge CRUD</h1>
            {/* Formulario de creación */}

            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            /* a onSubmit se le pasa la funcion para crear el unicornio */
            onSubmit={editingUnicorn ? onSaveEdit : onCreate}
            /* enableReinitialize permite que el formulario se actualice cuando cambian los valores iniciales */
            enableReinitialize 

            >
                <Form>
                    <div>
                        <label htmlFor="">Nombre</label>
                        {/* Field hace referencia al initialValues*/}
                        <Field name="name" type="text" />
                        {/* ErrorMessage hace referencua al esquema de validacion */}
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="">Color</label>
                        <Field name="color"/>
                        <ErrorMessage name="color" component='div' />                    </div>
                    <div>
                        <label htmlFor="">Edad</label>
                        <Field name="age"/>
                        <ErrorMessage name="age" component='div' />
                    </div>
                    <div>
                        <label htmlFor="">Poder</label>
                        <Field name="power"/>
                        <ErrorMessage name="power" component='div' />
                    </div>

                    {/* Boton de envio al ser tipo submit va usar la funcion onSubmit*/}
                    <Button label={editingUnicorn ? "Guardar unicornio" : "Crear unicornio"} type="submit"></Button>  

                </Form>

            </Formik>


            {/* Tabla de datos */}
            <DataTable 
                header="Unicorns" 
                value={unicorns} 
                paginator 
                rows={10}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                className="p-datatable-striped"
                emptyMessage="No se encontraron unicornios"
            >
                <Column field="name" header="Name" sortable filter></Column>
                <Column field="color" header="Color" sortable filter></Column>
                <Column field="age" header="Age" sortable></Column>
                <Column field="power" header="Power" sortable></Column>
                <Column 
                    body={bodyActions} 
                    header="Actions"
                    exportable={false}
                    style={{ minWidth: '8rem' }}
                ></Column>
            </DataTable>
        </Fragment>
    );
};

export default UnicornsView;