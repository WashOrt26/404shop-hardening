import { useState } from "react";
import "../styles/PagProducts.css";
import "../styles/buscador.css";
import { AiOutlineSearch } from "react-icons/ai";
import ProductCard from "../components/ProductCard";
import Anuncios from "../components/Anuncios";

function PagProducts({
    products = [],
    allProducts,
    total,
    setTotal,
    setAllProducts,
    countProducts,
    setCountProducts,
}) {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    // Garantiza que 'safeProducts' sea un arreglo incluso si 'products' llega como null o undefined
    const safeProducts = Array.isArray(products) ? products : [];

    const categories = [
        "Todas",
        ...new Set(
            safeProducts
                .map((product) => product?.categoria_nombre)
                .filter(Boolean)
        ),
    ];

    const results = safeProducts.filter((product) => {
        const matchesSearch = (product?.nombre || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "Todas" ||
            product?.categoria_nombre === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Anuncios posicion="top"/>
            <div className='catalogoLayout'>
                <aside className='filters'>
                    <div className='filterHeader'>
                        <h3>Filtros</h3>
                    </div>
                    <div className='filterSection'>
                        <h4>Categorías</h4>
                        <div className='categoryList'>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={
                                        selectedCategory === category
                                            ? "categoryButton active"
                                            : "categoryButton"
                                    }
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className='productsArea'>
                    <div className='topPages'>
                        <div className='buscador'>
                            <input
                                placeholder='Buscar productos...'
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <AiOutlineSearch className='iconBus' />
                        </div>
                    </div>

                    <div className='contProd'>
                        <div className='productos'>
                            {results.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default PagProducts;