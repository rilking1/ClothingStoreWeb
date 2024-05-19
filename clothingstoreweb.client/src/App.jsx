import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Materials from './Materials';
import Colors from './Colors';
import Photos from './Photos';
import Sizes from './Sizes';
import Products from './Products';
import Categories from './Categories';
import Clients from './Clients';
import Orders from './Orders';


function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/materials">Materials</Link>
                        </li>
                        <li>
                            <Link to="/colors">Colors</Link>
                        </li>
                        <li>
                            <Link to="/photos">Photos</Link>
                        </li>
                        <li>
                            <Link to="/sizes">Sizes</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link to="/clients">Clients</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/colors" element={<Colors />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="/sizes" element={<Sizes />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/orders" element={<Orders />} />



                </Routes>
            </div>
        </Router>
    );
}

export default App;
