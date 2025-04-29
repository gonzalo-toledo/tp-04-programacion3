import unicornImage from '../assets/pngwing.com.png'; 
const Home = () => {
    return (
        <div className="home-background">
            <div className="welcome-message">
            <h1>¡Bienvenido al Mundo de Unicornios!</h1>
            <p>Mi nombre es Gonzalo Toledo y este es mi primer proyecto con React.</p>
            <a href="/unicornios/crear">
                <img src={unicornImage} alt="Unicornio Cyberpunk" class = "unicorn-image"/> 
            </a>
            <p>¿Qué esperas para crear tu primer unicornio?</p>

        </div>
    </div>
    );
};

export default Home;
