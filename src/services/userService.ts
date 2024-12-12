import User from "../models/user.model";

interface UserInput {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

export const userService = {
  async createOrUpdateUser(userData: UserInput): Promise<User> {
    try {
      const [user] = await User.upsert({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        imageUrl: userData.imageUrl,
        lastLogin: new Date(),
      });
      return user;
    } catch (error) {
      console.error("Error in createOrUpdateUser:", error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;
    }
  },

  async updateUserPreferences(
    id: string,
    preferences: object
  ): Promise<User | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) return null;

      user.preferences = { ...user.preferences, ...preferences };
      await user.save();
      return user;
    } catch (error) {
      console.error("Error in updateUserPreferences:", error);
      throw error;
    }
  },
};
