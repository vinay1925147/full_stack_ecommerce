import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

function UseCartItemContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProduct);
 const { cartItems } = useSelector((state) => state.shopCart);
  // console.log(cartItem);

let  handleUpdateQuantity = (getCartItem, typeOfAction) => {
   
    if (!getCartItem) return;

    // Prevent decrementing below 1 to avoid removing the item unexpectedly
    if (typeOfAction === "minus") {
      if ((getCartItem?.quantity || 0) <= 1) {
        toast.info("Minimum quantity is 1");
        return;
      }
    }

    // For increment, ensure we don't exceed available stock (if productList is available)
    if (typeOfAction === "plus") {
      try {
        const getCurrentProductIndex = productList?.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock =
          getCurrentProductIndex > -1
            ? productList[getCurrentProductIndex]?.totalStock
            : undefined;

        const currentQuantity = getCartItem?.quantity || 0;
        if (
          typeof getTotalStock === "number" &&
          currentQuantity + 1 > getTotalStock
        ) {
          toast.info(`Only ${getTotalStock} quantity can be added for this item`);
          return;
        }
      } catch (err) {
        // if anything goes wrong with stock check, don't block the update but log it
        // console.error(err);
      }
    }

    const newQuantity =
      typeOfAction === "plus"
        ? (getCartItem?.quantity || 0) + 1
        : (getCartItem?.quantity || 0) - 1;

    // Ensure we never send a quantity less than 1
    if (newQuantity < 1) {
      toast.info("Minimum quantity is 1");
      return;
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity: newQuantity,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          toast.success("Update successful");
        } else {
          toast.error("Failed to update cart item");
        }
      })
      .catch((err) => {
        // handle errors from the thunk
        toast.error("Update failed");
        // console.error(err);
      });
  };

  const handleCartItemDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success("Cart item is deleted successfully");
      }
    });
  };

  return (
    <div className="flex items-center ">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className=" w-30 h-30 rounded object-center "
      />
      <div className="flex-1 ml-3">
        <h3 className="font-extrabold ">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1 ">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full cursor-pointer"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full cursor-pointer"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer ml-3"
          size={20}
        />
      </div>
    </div>
  );
}

export default UseCartItemContent;
