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
  RocketOutlined,
  CopyOutlined,
  RiseOutlined,
  EditOutlined,
  MailOutlined,
  FullscreenOutlined
} from "@ant-design/icons"; //ICon需要单独引入,antd 不再内置 Icon 组件，请使用独立的包 @ant-design/icons
// 返回图标
// 函数型组件，传入的参数就是props?
export default function Icon(props) {
  const { icon, style } = props;
  // console.log(style);
  if (icon === "home") return <HomeOutlined />;
  if (icon === "youtube") return <YoutubeOutlined style={style} />;
  if (icon === "smile") return <SmileOutlined style={style} />;
  if (icon === "calendar") return <CalendarOutlined style={style} />;
  if (icon === "folder") return <FolderOutlined style={style} />;
  if (icon === "fire") return <FireOutlined style={style} />;
  if (icon === "rocket") return <RocketOutlined style={style} />;
  if (icon === "copy") return <CopyOutlined style={style} />;
  if (icon === "rise") return <RiseOutlined style={style} />;
  if (icon === "edit") return <EditOutlined style={style} />;
  if (icon === "mail") return <MailOutlined style={style} />;
  if (icon === "fullscreen") return <FullscreenOutlined style={style} />;
  else return <MessageOutlined style={style}/>;
}
