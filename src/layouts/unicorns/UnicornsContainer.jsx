import React from "react";
import UnicornsView from "./UnicornsView";
import { useState, useEffect, useContext } from "react";
import { UnicornContext } from "../../context/UnicornContext";


const UnicornsContainer = () => {

    const {unicorns, getUnicorns, createUnicorn, loading, setLoading, error, setError, editingUnicorn, setEditingUnicorn, updateUnicorn, deleteUnicorn} = useContext(UnicornContext)


    const handleEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
    };

    const onCreate = async (values, {resetForm}) => {
        const success = await createUnicorn(values);
        if (success) {
            resetForm();            
        }
    }


    return (
        <UnicornsView 
            unicorns={unicorns}
            loading={loading}
            error={error}
            onCreate={onCreate}
            onEdit={handleEdit}
            onDelete={deleteUnicorn}
            onSaveEdit={updateUnicorn}
            editingUnicorn={editingUnicorn}
            // setLoading={setLoading}
            // setError={setError}
            // getUnicorns={getUnicorns}

        />
    );
};

export default UnicornsContainer;