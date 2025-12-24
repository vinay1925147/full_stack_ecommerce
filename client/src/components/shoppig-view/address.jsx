import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addressFormControls } from "../../config/index.js";
import { addNewAddress, getAllAddress } from "../../store/shop/address-slice";
import CommonForm from "../commen/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "react-toastify";

const initialFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address() {
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const handleAddOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data)=>{
        console.log(data)
        if(data?.payload?.success){
          //  toast.success(data?.payload?.msg)
           dispatch(getAllAddress(user?.id))
        }
    })
    setFormData(initialFormData)

  };
 
  console.log("addressList",addressList)
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllAddress(user.id));
    }
  }, [dispatch, user?.id]);
  return (
    <Card>
      <div>Address Component</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="spa">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText="Add Address"
          onSubmit={handleAddOnSubmit}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
export default Address;
