import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UseCartItemContent from "./cart-item-content";

function UseCartWrapper({ setOpenCartSheet, cartItems }) {
  // console.log(cartItems);
  const totalCartItem =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,0
        ) : 0
  const navigate = useNavigate();
  return (
    <SheetContent className="px-2">
       <SheetHeader>
         <SheetTitle className="font-extrabold">Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" mt-2 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UseCartItemContent cartItem={item} />)
          : null}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Cart</span>
          <span className="font-bold">${totalCartItem}</span>
        </div>
        <Button className="w-full mt-4" onClick={()=>{navigate("/shop/checkout")}}>CheckOut</Button>
      </div>
    </SheetContent>
  );
}

export default UseCartWrapper;
