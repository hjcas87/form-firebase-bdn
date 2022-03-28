import { Provider } from 'react-redux';
import { DashboardRoutes } from './routers/DashboardRoutes';
import { store } from './store/store';

function App() {
    return (
        <Provider store={store}>
            <DashboardRoutes />
        </Provider>
    );
}

export default App;
