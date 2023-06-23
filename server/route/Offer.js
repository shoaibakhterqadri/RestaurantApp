import express from "express";
import {
  AddOffers,
  DeleteOffer,
  GetAllOffers,
} from "../controllers/Offer.js";
import singleUpload from "../middleware/Multer.js";

const router = express.Router();
router.post("/addOffer", singleUpload, AddOffers);
router.delete("/deleteOffer", DeleteOffer);
// router.put("/updateOffer", singleUpload, UpdateOffer);
router.get("/getAllOffer", GetAllOffers);
export default router;
