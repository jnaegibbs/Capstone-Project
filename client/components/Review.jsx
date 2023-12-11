import { useAddReviewMutation } from "../redux/reviewApi";
import { Box, Typography, Rating, Button, Stack, Paper,Divider } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TextareaAutosize } from "@mui/base";
import { useAppSelector } from "../hooks";
import Login from "./Login";
import { useFetchSingleProductQuery } from "../redux/productsApi";

import Alert from '@mui/material/Alert';

const styles = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 900,
  fontSize: "large",
  letterSpacing: ".1rem",
  color: "inherit",
  textDecoration: "none",
  paddingLeft: 10,
};
const styles2 = {
  width: 500,
  maxWidth: "100%",
  paddingLeft: 10,
};
const Review = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [success,setSuccess] = useState(null);
  const [createReview] = useAddReviewMutation();
  const user = useAppSelector((state) => state.token.user);
  const { productId: productId } = useParams();
  const { data, error, isLoading } = useFetchSingleProductQuery(productId);

 


  async function handleReviewSubmit() {
    try {
      const response = await createReview({
        rating,
        content,
        userId: user.id,
        productId: productId,
      });
      setRating(0);
      setContent("");
      setSuccess(" Thank You!! Your Review Added Successfully");
      

    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding review:", error);
    }
  }

  return (
    <>
      {user !== (null && undefined) ? (
        <Box>
          <br />
          <br />
          <Typography variant="h1" sx={styles}>
            CREATE A REVIEW
          </Typography>
         
          <br />
          <Divider style={{width:'500px',margin:'0 5%'}}/>
          <br />
          <Typography variant="h2" sx={styles}>
          Product Details
          </Typography>
          <br />
          <br />
          <Box sx={styles}>
            <Paper elevation={0}>
              {data && (
                <Stack >
                  <Box  sx={styles2}>
                    <Typography variant="body1">{data.product.name}</Typography>
                  </Box>
                  <Box sx={styles2}>
                    <img
                      src={data.product.image}
                      width="100px"
                      height="100px"
                    />
                  </Box>

                  
                </Stack>
              )}
            </Paper>
          </Box>
          <br />
          <Divider style={{width:'500px',margin:'0 5%'}}/>
          <br />

          <br />
          <br />
          <Typography variant="h2" sx={styles}>
            Rating
          </Typography>
          <br />
          <Box sx={styles}>
          <Rating
            sx={styles2}
            
            name="rating"
            defaultValue={0}
            precision={0.5}
            value={rating}
            size="large"
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
          </Box>
          <br />
          <Divider style={{width:'500px',margin:'0 5%'}}/>
          <br />
          <br />
          <br />
          <Typography variant="h2" sx={styles}>
            Add Your Review
          </Typography>
          <br />
          <Box sx={styles}>
          <TextareaAutosize
            sx={styles2}
            placeholder="Write here..."
            minRows={5}
            value={content}
           // minLength={10}
            onChange={(event) => setContent(event.target.value)}
          />
          </Box>
          <br />
          <Divider style={{width:'500px',margin:'0 5%'}}/>
          <br />
          <br />
          <Box sx={styles}>
          <Button
            variant="contained"
           
            onClick={() => handleReviewSubmit()}
          >
            Submit
          </Button>
          </Box>
          <br/>
          <br/>
          <Paper>{success && <Alert severity="success">{success}</Alert>}</Paper>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Review;
