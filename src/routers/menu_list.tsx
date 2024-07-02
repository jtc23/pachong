import {
  CalculatorFilled,
  CommentOutlined,
  ContactsFilled,
  CrownFilled,
  ExperimentFilled,
  FileTextFilled,
  GithubFilled,
  GithubOutlined,
  GitlabFilled,
  GoldenFilled,
  IdcardFilled,
  InsuranceFilled,
  LockFilled,
  MediumSquareFilled,
  MessageFilled,
  MoneyCollectFilled,
  NotificationFilled,
  PictureOutlined,
  ReconciliationFilled,
  RedEnvelopeFilled,
  ScheduleFilled,
  SettingFilled,
  ShopFilled,
  ShopOutlined,
  SmileFilled,
  UsergroupAddOutlined,
  WalletFilled,
} from "@ant-design/icons";

const admin = {
  // path: "/",
  routes: [
    {
      name: "指标填报",
      path: "/admin/targetfill",
    },
    {
      path: "/admin/404",
      name: "园区预测",
      isDevloping: true,
    },
    {
      path: "/admin/areacombination",
      name: "园区组合",
      // isDevloping: true,
    },
  ],
};

export default {
  admin,
};
