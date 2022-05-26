import Sequelize from "@sequelize/core";
import sequelize from "./config";
import Login from "./userLogin";
import Profile from "./userProfile";
import WipCollections from "./wipcollections";
import Wips from "./wips";
import Followers from "./followers";

// Foreign keys for table joins in controllers.ts file
Login.belongsTo(Profile, { foreignKey: "profileId" });
Profile.hasOne(Login, { foreignKey: "profileId" });
WipCollections.belongsTo(Profile, { foreignKey: "profileId" });
Profile.hasMany(WipCollections, { foreignKey: "profileId" });
Wips.belongsTo(WipCollections, { foreignKey: "wipCollectionId" });
WipCollections.hasMany(Wips, { foreignKey: "wipCollectionId" });
Profile.hasOne(Followers, { foreignKey: "profileId" });
Followers.belongsTo(Profile, { as: "profile", foreignKey: "profileId"});
Followers.belongsTo(Profile, { as: "follower", foreignKey: "followerId"});

const db = {
  Login: Login,
  Profile: Profile,
  WipCollections: WipCollections,
  Wips: Wips,
  Followers: Followers,
  Sequelize: Sequelize,
  sequelize: sequelize,
};

export default db;
