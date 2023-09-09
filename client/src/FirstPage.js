import HomePage from "./assets/HomePage.png";
// import "./App.css";
import styled from "styled-components"

export function Firstpage(){
    
    return(
        <Container>
            {/* <img className="home" src={HomePage} /> */}
            <div className="text-box">
            <p>test 1</p>
            <p>test 1</p>
            <p>test 1</p>
            <p>test 1</p>
            </div>
            <div className="lol">
                Chat With ZORO
            </div>
        </Container>
    );
}

const Container = styled.div`
height:100vh;
width: 100vw;
background: url(${HomePage});
background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display:flex;

`