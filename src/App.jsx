import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CitiesProvider } from './contexts/CityContext'
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage"
//Lazy loading; code splitting; to reduce bundle size
const Homepage = lazy(()=>import("./pages/Homepage"));
const Pricing = lazy(()=>import("./pages/Pricing"));
const Product = lazy(()=>import("./pages/Product"));
const AppLayout = lazy(()=>import("./pages/AppLayout"));
const PageNotFound = lazy(()=>import("./pages/PageNotFound"));
const Login = lazy(()=>import("./pages/Login"));

export default function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<Homepage />}/>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element=
           {<ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>}>
            <Route index element={<Navigate replace to="cities"/>} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />}/>
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}