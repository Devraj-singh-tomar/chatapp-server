import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
// import { ErrorHandler } from "../utils/utility.js";
// import { Message } from "../models/message.model.js";

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});
