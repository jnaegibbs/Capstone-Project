import { Paper } from "@mui/material";
import { useFetchSingleProductQuery } from "../redux/productsApi";
import { useParams, useNavigate } from "react-router-dom";

const SingleView = () => {
  const { productId: productId } = useParams();

  const { data, error, isLoading } = useFetchSingleProductQuery(productId);

  return <Paper elevation={1}>
   {data && <img src={data.product.image} width={200} height={300}/>} 
  </Paper>;
};

export default SingleView;
