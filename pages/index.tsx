import Head from "next/head";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

const formatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      priceFormated: formatter.format(product.price),
    }));

    const totalPrice = data.reduce((acc, product) => acc + product.price, 0);

    setResults({ totalPrice, data: products });
  };

  const addToWishList = useCallback(async (id: number) => {
    console.log({ id });
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div>
        <h1>Search</h1>
        <form onSubmit={handleSearch}>
          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
          <button type='submit'>buscar</button>
        </form>

        <SearchResults
          onAddToWishList={addToWishList}
          results={results.data}
          totalPrice={results.totalPrice}
        />
      </div>
    </>
  );
}
