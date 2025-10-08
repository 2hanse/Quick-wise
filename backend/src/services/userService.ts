import { User, IUser } from "../models/User";
import constants from "../constants/messages";

const getUserById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error(constants.ERROR_MESSAGES.USER.NOT_FOUND);
  }

  return user;
};

const validateUserTokens = (user: IUser): void => {
  if (!user.googleAccessToken) {
    throw new Error(
      constants.ERROR_MESSAGES.CALENDAR.GOOGLE_ACCESS_TOKEN_NOT_FOUND
    );
  }
};

const validateUserRefreshToken = (user: IUser): void => {
  if (!user.googleRefreshToken) {
    throw new Error(
      constants.ERROR_MESSAGES.GOOGLE_AUTH.REFRESH_TOKEN_NOT_FOUND
    );
  }
};

export { getUserById, validateUserTokens, validateUserRefreshToken };
