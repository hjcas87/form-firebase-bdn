import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { login } from '../actions/auth';
import { startLoadingReleases } from '../actions/releases';
import { LoadingScreen } from '../components/LoadingScreen';
import { AdminLayout } from '../layout/AdminLayout';
import { AuthLayout } from '../layout/AuthLayout';
import { AlbumScreen } from '../pages/AlbumScreen';
import { DashboardScreen } from '../pages/DashboardScreen';
import { LoginScreen } from '../pages/LoginScreen';
import { RegisterScreen } from '../pages/RegisterScreen';
import { SongsScreen } from '../pages/SongsScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const auth = getAuth();

export const DashboardRoutes = () => {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingReleases(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <LoadingScreen />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <PublicRoute isAuth={isLoggedIn}>
                            <AuthLayout />
                        </PublicRoute>
                    }
                >
                    <Route index element={<LoginScreen />} />
                    <Route path="register" element={<RegisterScreen />} />
                </Route>

                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuth={isLoggedIn}>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashboardScreen />} />
                    <Route path="album" element={<AlbumScreen />} />
                    <Route path="simple" element={<AlbumScreen />} />
                    <Route path="song/:id" element={<SongsScreen />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
