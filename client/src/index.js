import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Firstpage} from "./FirstPage.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Firstpage />
);

reportWebVitals();
