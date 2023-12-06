import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUserOrderQuery } from "../redux/orderApi";
import HomePage from "./HomePage";
import { Product } from "./Checkout";
import { useDeleteAllCartItemMutation } from "../redux/cartItemApi";
import { useEffect } from "react";

const Order = ({ userId, noOfOrder }) => {
  const { data, error, isLoading } = useGetUserOrderQuery(userId);
  const orderDetail = [];

  if (data) {
    for (
      let i = data.orders.length - 1;
      i >= data.orders.length - noOfOrder;
      i--
    ) {
      orderDetail.push(data.orders[i]);
    }
  }

  return (
    <>
      {data &&
        orderDetail.map((order) => {
          return (
            <div key={order.id}>
              <Product productId={order.productId} quantity={order.quantity} />
            </div>
          );
        })}
    </>
  );
};

const Confirmation = () => {
  const user = useSelector((state) => state.token.user);
  const [deletecartItem] = useDeleteAllCartItemMutation();

  const { noOfOrder: noOfOrder } = useParams();
  useEffect(() => {
    async function handleDelete() {
      if (user) {
        console.log(user.cart[0].id);
        const { data } = await deletecartItem(user.cart[0].id);
        console.log(data);
      }
    }

    handleDelete();
  }, []);

  return (
    <div>
      <br />
      {user !== (null && undefined) ? (
        <div>
          <br />
          <br />

          <Typography variant="h5">
            {" "}
            Thank you! {user.profile[0].name} !!
          </Typography>
          <br />
          <br />
          <Order userId={user.id} noOfOrder={noOfOrder} />
        </div>
      ) : (
        <div>
          <HomePage />
        </div>
      )}
    </div>
  );
};

export default Confirmation;
