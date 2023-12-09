import {
  Typography,
  Avatar,
  Stack,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUserOrderQuery } from "../redux/orderApi";
import HomePage from "./HomePage";
import { useDeleteAllCartItemMutation } from "../redux/cartItemApi";
import { useEffect } from "react";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { TiTick } from "react-icons/ti";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// const ProductDetail = ({ productId, quantity, orderId }) => {
//   const { data } = useFetchSingleProductQuery(productId);

//   return (
//     <>
//       {data && (
//         <Stack direction="row" spacing={6}>
//           <Typography variant="body1" sx={{ color: "#0766AD" }}>
//             order #{orderId}
//           </Typography>
//           <Avatar src={data.product.image} sizes="large" variant="square" />{" "}
//           <Typography variant="body1">{data.product.name}</Typography>
//           <Typography variant="body1">x{quantity}</Typography>
//         </Stack>
//       )}
//       <Divider sx={{ width: "65%", padding: "10px",m:'10px 0'}} />
//     </>
//   );
// };

// const Order = ({ userId, noOfOrder }) => {
//   const { data, error, isLoading } = useGetUserOrderQuery(userId);
//   const orderDetail = [];

//   if (data) {
//     for (
//       let i = data.orders.length - 1;
//       i >= data.orders.length - noOfOrder;
//       i--
//     ) {
//       orderDetail.push(data.orders[i]);
//     }
//   }

//   return (
//     <>
//       {data &&
//         orderDetail.map((order) => {
//           return (
//             <div key={order.id} style={{ margin: "0 10%" }}>
//               <ProductDetail
//                 orderId={order.id}
//                 productId={order.productId}
//                 quantity={order.quantity}
//               />
//             </div>
//           );
//         })}
//     </>
//   );
// };

const Confirmation = () => {
  const user = useSelector((state) => state.token.user);
  const [deletecartItem] = useDeleteAllCartItemMutation();
  const navigate = useNavigate();

  // const { noOfOrder: noOfOrder } = useParams();
  useEffect(() => {
    async function handleDelete() {
      if (user) {
        const { data } = await deletecartItem(user.cart[0].id);
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

          <Typography
            variant="h5"
            sx={{ m: "1% 5%", fontFamily: "monospace" }}
          >
            {" "}
            <GiConfirmed /> Thank you! {user.profile[0].name} !!
          </Typography>

          <br />
          <br />
          <Typography  variant="h6"
            sx={{ m: "2% 8%", fontFamily: "monospace" }}>Items in this Shipment</Typography>
          {/* // <Order userId={user.id} noOfOrder={noOfOrder} /> */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#7071E8",
              padding: 1,
              width: 200,
              m: "5% 10%",
            }}
            size="medium"
            onClick={()=> navigate("/")}
          >
            Continue Shopping
          </Button>
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
