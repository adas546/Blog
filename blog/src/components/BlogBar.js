// 博客页导航
import React, { useEffect, useState } from "react";
import { Anchor } from "antd";
const { Link } = Anchor;

const BlogBar = ({ anchor }) => {
  // 输入是对象，anchor: 导航的id值，level: 第几等标签，text: 目录内容
  // console.log(anchor);
  // return <div>123456</div>;
  // console.log(anchor);
  const topRef = React.useRef(null);
  const [targetOffset, setTargetOffset] = useState();
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);
  return (
    <div>
      <Anchor targetOffset={targetOffset} items={Array.from(new Set(anchor))} />
    </div>
  );
};

export default BlogBar;
