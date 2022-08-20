import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  UnfollowUser,
  getAllUsers,
} from "../Controllers/UserController.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   res.send("user route");
// });
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", UnfollowUser);

export default router;
