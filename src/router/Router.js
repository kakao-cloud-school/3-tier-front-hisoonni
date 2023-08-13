import React from "react";
import { Routes, Route, } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

class Router extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        )
    }
}

export default Router;