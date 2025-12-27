import paypal from "paypal-rest-sdk";
paypal.configure({
  mode: "sandbox",
  client_id:
    "ASUis_6YVj5onRi3KCx_TcBljOkQ1TEw59TX00062NF1r8GzqpntTbkyXXTAPnNNuS9pYPfISsVtBVZD",
  client_secret:
    "ELHOnXY1cnwpdalWemZK6AuksysvGRTBuLdBuRVn7Lr8u_vPoKR-01Sex3rhh6K-uhlm2PS60HBCZl6E",
});
export default paypal;