export type AddProductToWishListProps = {
  onAddToWishList: () => void;
  onRequestClose: () => void;
};

export const AddProductToWishList = ({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishListProps) => {
  return (
    <span>
      Deseja adicionar aos favoritos?
      <button onClick={onAddToWishList}> Sim </button>
      <button onClick={onRequestClose}> Nao </button>
    </span>
  );
};
