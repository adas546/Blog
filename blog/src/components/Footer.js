import styles from "../styles/components/footer.module.css";
import { useEffect, useState } from "react";
import { Tag, message } from "antd";
const Footer = () => {
  const [time, setTime] = useState({});
  let timer = null;
  useEffect(() => {
    let date1 = new Date("2020/02/24 18:00");
    let s1 = date1.getTime();
    timer = setInterval(() => {
      let s2 = Date.now();
      let total = (s2 - s1) / 1000;
      let day = parseInt(total / (24 * 60 * 60)); //计算整数天数
      let afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
      let hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
      let afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
      let min = parseInt(afterHour / 60); //计算整数分
      let afterMin = parseInt(
        total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60
      ); //取得算出分后剩余的秒数
      setTime({ day, hour, min, afterMin });
    });
    return () => {
      // 相当于compontWillUnMount
      if (timer != null) {
        //对定时器进行销毁
        clearInterval(timer);
      }
    };
  }, []);
  const { day, hour, min, afterMin } = time;
  return (
    <div className={styles.footer_div}>
      <div>本系统由React+Node+Antd Design联合驱动</div>
      <div>
        <Tag color="#f50" style={{ margin: "0 .3rem" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tongji.baidu.com/web/10000192192/homepage/index"
          >
            百度统计
          </a>
        </Tag>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.beian.miit.gov.cn/"
        >
          蜀ICP备2023005214号
        </a>
        <Tag color="#2db7f5" style={{ margin: "0 .3rem" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            阿里云
          </a>
        </Tag>
      </div>
      <div>
        本站已存活{" "}
        <span style={{ color: "hotpink", fontSize: ".7rem" }}>
          {day + "天" + hour + "小时" + min + "分钟" + afterMin + "秒"}
        </span>
      </div>
      {/* <div>时间序列小杰</div> */}
    </div>
  );
};

export default Footer;
