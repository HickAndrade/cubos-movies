import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { RouteGuard } from "../components/RouteGuard";
import MoviesPage from "../pages/Movies";

export function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
            <Route
                    path="/"
                    element={
                        <RouteGuard requireAuth={false}>
                            <RootLayout>
                                <></>
                            </RootLayout>
                        </RouteGuard>
                    } />
                <Route
                    path="/movies"
                    element={
                        <RouteGuard requireAuth={true}>
                            <RootLayout itemCenter={false}>
                                <MoviesPage />
                            </RootLayout>
                        </RouteGuard>
                    } />
                <Route
                    path="/login"
                    element={
                        <RouteGuard requireAuth={false}>
                            <RootLayout>
                                <Login />
                            </RootLayout>
                        </RouteGuard>
                    } />
                <Route
                    path="/register"
                    element={
                        <RouteGuard requireAuth={false}>
                            <RootLayout>
                                <Register />
                            </RootLayout>
                        </RouteGuard>
                    } />
            </Routes>
        </BrowserRouter>
    )
}