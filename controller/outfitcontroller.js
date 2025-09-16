
const outfitmodel = require("../model/outfitmodel")

// جلب الأوتفيت حسب المزاج
export const getOutfitsByMood = async (req, res) => {
  try {
    const mood = req.params.mood;
    const outfits = await outfitmodel.find({ mood });
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
