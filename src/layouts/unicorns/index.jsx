import UnicornsContainer from "./UnicornsContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const UnicornsModule = () => {
    return (
        <Router>
            <Routes>
                <Route path="/unicornios" element={<UnicornsContainer />} />
                {/* Puedes agregar más rutas aquí si es necesario */}
            </Routes>
        </Router>
        
    )
}

export default UnicornsModule;