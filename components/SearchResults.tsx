import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";

type SearchResultsProps = {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormated: string;
  }>;
  onAddToWishList: (number: number) => void;
  totalPrice: number;
};

export const SearchResults = ({ results, onAddToWishList, totalPrice }: SearchResultsProps) => {
  // const totalPrice = useMemo(
  //   () => results.reduce((acc, product) => acc + product.price, 0),
  //   [results]
  // );

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <ProductItem product={results[index]} onAddToWishList={onAddToWishList} />
    </div>
  );

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};
