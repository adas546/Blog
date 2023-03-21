// 现在的Icon是按需引入了，不是用Icon type="home"了
// import {
//   HomeOutlined,
//   YoutubeOutlined,
//   SmileOutlined,
// } from "@ant-design/icons"; //ICon需要单独引入,antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons
import {
  HomeOutlined,
  YoutubeOutlined,
  SmileOutlined,
  MessageOutlined,
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons"; //ICon需要单独引入,antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons
// 返回图标
// 函数型组件，传入的参数就是props?
export default function Icon({ icon }) {
  if (icon === "home") return <HomeOutlined />;
  if (icon === "youtube") return <YoutubeOutlined />;
  if (icon === "smile") return <SmileOutlined />;
  if (icon === "calendar") return <CalendarOutlined />;
  if (icon === "folder") return <FolderOutlined />;
  if (icon === "fire") return <FireOutlined />;
  if (icon === "user") return <UserOutlined />;
  if (icon === "key") return <KeyOutlined />;
  else return <MessageOutlined />;
}
