import { createContext, useState, useEffect } from "react";

//creacion del context:
export const UnicornContext = createContext() // al context lo voy a importar en UnicornsContainer.jsx


// el provider es el que va a envolver a los componentes que van a usar el context(toda la funcionalidad)
// al provider lo voy a importar en App.jsx
//children es lo que se va a renderizar dentro del provider, es una palabra reservada
export const UnicornProvider = ({ children }) => {
    const[unicorns, setUnicorns]= useState([]);
    const [editingUnicorn, setEditingUnicorn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_URL = 'https://crudcrud.com/api/bc1c7a202ca34057bd5144b1e44aa8f2/unicorns';




    
    const getUnicorns = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json()
            setUnicorns(data) 
        }catch (error) {
            setError(error.message);
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }   
    }
    useEffect(() => {
        getUnicorns()
    }
    , [])

    //crear un unicornio
    const createUnicorn = async (value) => {
        console.log("nuevo unicornio",value);
        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(value)
            });

            if (!response.ok) throw new Error('Error al crear el unicornio');

            await getUnicorns(); // Actualiza la lista de unicornios después de crear uno nuevo
            return true;
        } catch (error) {
            setError(error.message);
            console.error("Create error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };


    // editar un unicornio
    const updateUnicorn = async (values) => {
        if(!editingUnicorn) return; // Si no hay un unicornio en edición, no hacemos nada
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${editingUnicorn._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            });

            if (!response.ok) throw new Error('Error al actualizar el unicornio');

            setEditingUnicorn(null); // Resetear el unicornio en edición
            await getUnicorns(); // Actualiza la lista de unicornios después de editar uno

        } catch (error) { 
            setError(error.message);
            console.error("Update error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteUnicorn = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar el unicornio');

            await getUnicorns(); // Actualiza la lista de unicornios luego de eliminar uno
            return true;

        } catch (error) {
            setError(error.message);
            console.error("Delete error:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };




    return (
        <UnicornContext.Provider 
            value={{unicorns, getUnicorns, createUnicorn, loading, setLoading, updateUnicorn, error, setError, editingUnicorn, setEditingUnicorn, deleteUnicorn}}>
            {children}
        </UnicornContext.Provider>
    );
}