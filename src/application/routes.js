import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../pages/home';
import Budget from '../pages/budget';

export default () => (
    <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Home/>} />
            <Route path="/budget/" element={<Budget/>} />
        </Routes>
    </BrowserRouter>
);
