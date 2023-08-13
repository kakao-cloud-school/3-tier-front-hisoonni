import React, { useState } from "react";
import '../pages_css/Home.css';
import BoadModal from './BoardModal';

const Home = () => {
    const [modal_is_open, setModalIsOpen] = useState(false);
    return (
        <div className="parentDv">
            <h1 className="sectionTitle">Home</h1>
            <div className="buttonDiv">
                <button className="googButton" onClick={() => setModalIsOpen(true)}>NEW</button>
            </div>
            <BoadModal modal_is_open={modal_is_open} setModalIsOpen={setModalIsOpen}/>
        </div>
    );
};
export default Home;