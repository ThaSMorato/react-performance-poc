import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "./AddProductToWishList";
// import { AddProductToWishList } from "./AddProductToWishList";
import lodash from "lodash";
const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => import("./AddProductToWishList").then((mod) => mod.AddProductToWishList),
  {
    loading: () => <span>Carregando ....</span>,
  }
);

// const showFormattedDate = async () => {
//   const { format } = await import('date-fns');

//   format(new Date())
// }

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormated: string;
  };
  onAddToWishList: (id: number) => void;
};

const ProductItemComponent = ({ product, onAddToWishList }: ProductItemProps) => {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormated}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Add to wish list</button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
};
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) =>
  lodash.isEqual(prevProps.product, nextProps.product)
);
