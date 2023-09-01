import React from "react";
import HeaderBoxes from "../Header Boxes/HeaderBoxes";
import Header from "../Header/Header";
import About from "../Info/About";
import Contact from "../Info/Contact";
import MainNavbar from "../Navbar/MainNavbar";

const Home = () => {
    return (
        <div>
            < MainNavbar / >
            < Header / >
            < HeaderBoxes / >
            < About / >
            < Contact / >
        </div>
    );
};

export default Home;