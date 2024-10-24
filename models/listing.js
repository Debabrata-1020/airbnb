const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    description : String,
    image: {
        url : String ,
        filename :String 
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type:Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner :{
        type : Schema.Types.ObjectId ,
        ref: "User"
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if (listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


// image : {
//     type : String,
//     url : String ,
//     default : "https://cdn.pixabay.com/photo/2024/08/18/14/34/folkstone-8978132_1280.jpg",
//     set : (v) =>
//          v === "" 
//     ? "https://cdn.pixabay.com/photo/2024/08/18/14/34/folkstone-8978132_1280.jpg" 
//     : v,
// },