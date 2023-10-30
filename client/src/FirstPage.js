import Chat from "./Chat.js";
import HomePage from "./assets/HomePage.png";
// import "./App.css";
import styled from "styled-components"
import {Routes, Route, useNavigate} from 'react-router-dom';


export function Firstpage(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/Chat");
    } 
    
    return(
        <Container>
            {/* <img className="home" src={HomePage} /> */}
            <header>
                <h1>Zoro Chat</h1>
                <nav>
                <div className="logo">
                <img src="logo.png" />
                </div>
                </nav>
            </header>
            <div className="top">
            <section className="intro">
                <h2>Welcome to Zoro Chat!</h2>
                <p>Zoro is an innovative AI-powered chatbot, revolutionizing the way you manage your health. With advanced technology and access to an extensive database of up-to-date medical knowledge, Zoro offers expert medical diagnoses and invaluable insights in a natural, conversational manner.</p>
                <p>By analyzing user queries and asking pertinent follow-up questions, Zoro provides well-informed responses tailored to individual needs, empowering users to make informed decisions about their health and well-being.</p>
                <p>Zoro's mission is clear: to simplify healthcare access and offer precise information, making it effortless for users to stay informed and take charge of their health.</p>
            </section>
            <div className="lol" onClick={handleClick}>
                Chat With ZORO
            </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
height:100vh;
width: 100vw;
background: url(${HomePage});
opacity: 0.90;
background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
   .top{
    display:flex;
    justify-content: space-between;
    flex-direction: column;
   }
   .logo{
    margin: 4%;
    padding: 10px;
   }
    h2{
        font-size: 2rem;
    }
    .intro{
        font-family: 'Libre Baskerville', serif;
        font-size: 1rem;
        color: white;
        width: 80%;
        height: 30%;
        margin-left: 100px;
        
    }
    .lol {
        color: white;
        padding: 12px;
        border: 1px solid white;
        border-radius: 5px;
        text-align: left;
        transition: ease 0.25s all;
        margin-bottom: 100px;
        margin-top: 100px;
        margin-left: 100px;
        font-size: 2rem;
        background: rgb(2,0,36);
        background: linear-gradient(90deg, #0097b2, #7ed957);
        font-family: 'Libre Baskerville', serif;
        width: 22%;
    }
    .lol:hover {
        background-color: rgba(236, 10, 10, 0.635);
    }

`