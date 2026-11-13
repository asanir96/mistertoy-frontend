import Rating from '@mui/material/Rating';


export function FeedBackRating({ rating,handleChange }) {
    return (
        <Rating
            sx={{ gridColumn: 1,gridRow:1,justifySelf:'end',alignSelf:'center'}}
            name="rating"
            defaultValue={2}
            value={rating}
            onChange={handleChange}
        />
    );
}