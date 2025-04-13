import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Suspense fallback={<div>Загрузка приложения...</div>}>
                <App/>
            </Suspense>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();