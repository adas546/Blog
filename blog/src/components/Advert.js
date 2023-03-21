//广告/重要内容，很长时间才变一次，因此可以用静态来写
import styles from "../styles/components/advert.module.css";
const Advert = () => {
  return (
    // 利用格式化字符串，就可以实现多个类名了
    <div className={`${styles.ad_div} comm-box`}>
      <div>
        <div>
          <img
            src="http://blogimages.jspang.com/flutter_ad2.jpg"
            width="100%"
          />
        </div>
        <div>
          <img
            src="http://blogimages.jspang.com/Vue_koa_ad1.jpg"
            width="100%"
          />
        </div>
        <div>
          <img
            src="http://blogimages.jspang.com/WechatIMG12.jpeg"
            width="100%"
          />
        </div>
        <div>
          <img src="https://jspang.com/images/ad_4.jpg" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Advert;
