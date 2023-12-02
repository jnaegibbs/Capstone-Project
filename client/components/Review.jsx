import { useAddReviewMutation } from "../redux/reviewApi";
import { Box, Typography, Rating, Button } from "@mui/material";
import { useState } from "react";

import { TextareaAutosize } from "@mui/base";
import { useAppSelector } from "../hooks";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [createReview] = useAddReviewMutation();
  const user = useAppSelector((state) => state.token.user);

  async function handleReviewSubmit() {
    try {
      const response = await createReview({
        rating,
        content,
        userId: user.id,
        productId: 1,
      });
      console.log(response);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error adding review:", error);
    }
  }

  return (
    <Box>
    
        <Typography component="h1">Create a Review</Typography>

        <Typography component="h1">Rating</Typography>
        <Rating
          name="rating"
          defaultValue={0}
          precision={0.5}
          value={rating}
          size="large"
          onChange={(event) => {
            setRating(event.target.value);
          }}
        />
        <Typography component="h1">Add Your Review</Typography>
        <TextareaAutosize
          placeholder="Write here..."
          minRows={3}
          value={content}
          minLength={10}
          onChange={(event) => setContent(event.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" onClick={() => handleReviewSubmit()}>
          Submit
        </Button>

    </Box>
  );
};

export default Review;
