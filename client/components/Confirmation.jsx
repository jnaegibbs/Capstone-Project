import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchCartByUserQuery } from "../redux/cartApi";

import HomePage from "./HomePage";

const Confirmation = () => {
  const user = useSelector((state) => state.token.user);
  const {orderIds} = useParams();
  console.log("orderId"+orderIds)


  console.log(user);
  return (
    <div>
      <br />
      {user !== null ? (
        <Typography variant="h5">
          {" "}
          Thank you! Your order confirmed !!
        </Typography>
      ) : (
        <div>
          <HomePage />
        </div>
      )}
    </div>
  );
};

export default Confirmation;
