import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { RouteGuard } from "../components/RouteGuard";

export function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RouteGuard requireAuth={true}>
                            <RootLayout>
                                <></>
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