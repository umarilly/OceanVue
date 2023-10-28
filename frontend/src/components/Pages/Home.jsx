import React from "react";
import HeaderBoxes from "../Header Boxes/HeaderBoxes";
import Header from "../Header/Header";
import About from "../Info/About";
import MainNavbar from "../Navbar/MainNavbar";
import Footer from "../Info/Footer";

const Home = () => {
    return (
        <div>
            < MainNavbar / >
            < Header / >
            < HeaderBoxes / >
            < About / >
            < Footer />
        </div>
    );
};

export default Home;