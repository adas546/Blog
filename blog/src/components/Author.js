//   Avatar:头像
import { Avatar, Divider, Tooltip } from "antd";
import Icon from "./Icon";
import styles from "../styles/components/author.module.css";
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons";
const Author = () => {
  return (
    <div
      className={`${styles.author_div} comm-box`}
      style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
    >
      <div>
        {/* 默认路径是从public开始的 */}
        <Avatar size={100} src="/huiyuan.jpg"></Avatar>
      </div>
      <div className={styles.myname} style={{ color: "rgba(0, 0, 0, 0.65)" }}>
        时间序列小杰
      </div>
      <div className={styles.author_introduction}>
        写个博客用于记录自己学习的经历。希望我的博客能帮后来者少走点弯路
      </div>
      <div className={styles.author_chat}>
        <br />
        前端: React + Antd Design
        <br />
        后端: Node + mysql
        <br />
        <Icon icon="mail" /> 2673354970@qq.com
        <br />
        <div>
          {/* 分割线 */}
          <Divider>社交账号</Divider>
          {/* icon:选择自己的图标 */}
          <Tooltip placement="top" title="github">
            <a
              href="https://github.com/adas546"
              target="_blank"
              rel="noopener noreferrer"
              // style={{
              //   display: "inline-block",
              //   marginLeft: ".5rem",
              //   marginRight: ".5rem",
              // }}
            >
              <Avatar
                size={28}
                icon={<GithubOutlined />}
                className={styles.account}
              />
            </a>
          </Tooltip>
          <Tooltip placement="top" title="暂时保密哦">
            <Avatar
              size={28}
              icon={<QqOutlined />}
              className={styles.account}
            />
          </Tooltip>
          <Tooltip placement="top" title="暂时保密哦">
            <Avatar
              size={28}
              icon={<WechatOutlined />}
              className={styles.account}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Author;
