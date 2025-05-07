import DataAPIService from "@services/core/data-api-service";

namespace UserModel {
  const COLLECTION_NAME = `${process.env.PROJECT_NAME}-users`;

  export const createOrGetUser = async (walletAddress: string) => {
    const dbUser = await findByWalletAddress(walletAddress);

    if (dbUser) return dbUser;

    const user: IUser = {
      walletAddress,
    };

    const insertedId = await DataAPIService.insertOne<IUser>(
      COLLECTION_NAME,
      user
    );

    const createdUser = await findById(insertedId);

    return createdUser;
  };

  export const findByWalletAddress = async (walletAddress: string) => {
    const user = await DataAPIService.findOne<IUser>(COLLECTION_NAME, {
      walletAddress,
    });

    return user;
  };

  export const findById = async (uid: string) => {
    const user = await DataAPIService.findOne<IUser>(COLLECTION_NAME, uid);

    return user;
  };
}

export default UserModel;
