import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get a post with aws s3

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get a post

// export const getPost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await PostModel.findById(id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//Update a post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  // const { userId } = req.body;
  // console.log(postId);
  // console.log(userId);
  // console.log(req.body);

  try {
    const post = await PostModel.findById(postId);
    // if (post.userId === userId) {
    await post.deleteOne();
    res.status(200).json("Post deleted successfully");
    // } else {
    //   res.status(403).json("Action forbidden");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like-dislike a post
export const likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post like");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  // const client = new S3Client(clientParams);
  // for (const post of posts) {
  //   const getObjectParams = {
  //     Bucket: bucketName,
  //     Key: post.image,
  //   };
  //   const command = new GetObjectCommand(getObjectParams);
  //   const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  // }
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getTimelinePosts = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const currentUserPosts = await PostModel.find({ userId: userId });

//     const followingPosts = await UserModel.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res.status(200).json(
//       currentUserPosts
//         .concat(...followingPosts[0].followingPosts)
//         .sort((a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         })
//     );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
