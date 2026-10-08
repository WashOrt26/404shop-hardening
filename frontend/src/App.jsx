import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PagProducts from "./pages/PagProducts";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Pago from "./pages/Pagos";
import CompraExitosa from "./pages/CompraExitosa";
import { productsapi } from "./api/products.api";

function App() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    useEffect(() => {
    async function loadProducts() {
        try {
            const res = await productsapi();
            const dataArray = Array.isArray(res.data) ? res.data : (res.data?.results || []);
            setProducts(dataArray);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            setProducts([]);
        }
    }

    loadProducts();
}, []);

    useEffect(() => {
        const newTotal = allProducts.reduce(
            (acc, item) => acc + Number(item.precio) * (item.Cantidad || 0),
            0,
        );

        setTotal(newTotal);

        const newCount = allProducts.reduce(
            (acc, item) => acc + (item.Cantidad || 0),
            0,
        );

        setCountProducts(newCount);
    }, [allProducts]);

    return (
        <>
            <Navbar
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />

            <Routes>
                <Route
                    path='/'
                    element={
                        <PagProducts
                            products={products}
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            total={total}
                            setTotal={setTotal}
                            countProducts={countProducts}
                            setCountProducts={setCountProducts}
                        />
                    }
                />

                <Route
                    path='/producto/:id'
                    element={
                        <ProductDetail
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            products={products}
                        />
                    }
                />

                <Route
                    path='/checkout'
                    element={
                        <Checkout allProducts={allProducts} total={total} />
                    }
                />

                <Route path='/pago' element={<Pago/>} />
                <Route path="/compra-exitosa" element={ <CompraExitosa setAllProducts={setAllProducts}/> }/>
            </Routes>
        </>
    );
}

export default App;
