import { useGetReviewsQuery ,useGetSingleReviewQuery,useAddReviewMutation} from "../redux/reviewApi";

const Review = () => {
    const review = {
        content:"testing review from review page",
        rating : 4.5,
        userId : 1,
        productId : 3
    }

    const {data={},isloading,error} = useAddReviewMutation(review);
    console.log(data);
    return(
        <div>Review Page</div>
    )
}

export default Review;