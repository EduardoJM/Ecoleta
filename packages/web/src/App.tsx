import React from 'react';
import './styles/App.css';
import './styles/form.css';

import { Provider as StoreProvider } from 'react-redux';
import { store } from './redux';
import GlobalDisplay from './components/GlobalDisplay';
import Routes from './routes';

function App() {
    return (
        <StoreProvider store={store}>
            <Routes />
            <GlobalDisplay />
        </StoreProvider>
    );
}

export default App;
