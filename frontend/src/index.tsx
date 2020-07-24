// react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

// components
import { App } from './App';

// apis

// utils

// css
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.scss';

// images

const ROOT = document.querySelector('#root');

ReactDOM.render(<Router><App /></Router>, ROOT);
