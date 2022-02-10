import { Link } from 'react-router-dom';

const Home = () => 
    <div>
        <div> 
            <ul className='menu'>
                <li className='ms-5 mt-3'><Link to="/" className='enlace'>Home</Link></li>
                <li className='ms-5 mt-3'><Link to="/budget" className='enlace'>Budget</Link></li>
            </ul>
        </div>
        <h1 className='title text-center'>¡Bienvenido a tu consultoría de marketing online de confianza!</h1>
        <p className='text text-center'>Pulsa en <a href='/budget' className='enlace'>Budget</a> para hacer un presupuesto según tus necesidades</p>
    </div>

export default Home;