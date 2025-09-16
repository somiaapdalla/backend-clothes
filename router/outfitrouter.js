import express from "express";
import { getOutfitsByMood } from "../controller/outfitcontroller";

const router = express.Router();

router.get("/outfits/:mood", getOutfitsByMood);

export default router;
