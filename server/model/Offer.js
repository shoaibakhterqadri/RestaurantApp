import mongoose from "mongoose";
const OfferSchema = new mongoose.Schema(
    {
        image: {
            public_id: String,
            url: String,
        },
        expiryDate: { type: String, required: true },
    },
    { timestamps: true }
);
const Offer = mongoose.model("Offer", OfferSchema);
export default Offer;
