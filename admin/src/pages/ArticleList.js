import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

export default function ArticleList(props) {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  //   生命周期钩子
  useEffect(() => {
    // 相当于DidMount
    getList();
  }, []);
  // 获取文章列表
  const getList = () => {
    axios({
      method: "GET",
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.list);
    });
  };
  // 删除文章，为了防止误删，所以需要提示下
  const delArticle = (id) => {
    confirm({
      title: "确定要删除这篇博客文章吗?",
      content: "如果你点击ok键，文章将永远被删除，无法恢复",
      onOk() {
        // 路由参数设置了:，这里/不能漏
        axios(servicePath.delArticle + id, {
          withCredentials: true,
        })
          .then((res) => {
            message.success("文章删除成功");
            getList(); //实际不能再去后台查，特别是数据量大的时候，应该做的是前台删除然后重新渲染，这里涂省事了
          })
          .catch((error) => {
            message.error("服务器端炸裂了" + error);
          });
      },
      onCancel() {
        message.success("取消操作，程序不做任何处理");
      },
    });
  };
  // 点击文章列表页的修改文章按钮，跳转到文章修改界面
  const updateArticle = (id, checked) => {
    navigate("/index/add/" + id);
  };
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        // 别忘了return，这里是()，不是{}
        renderItem={(item) => (
          <List.Item>
            {/* 这里样式就是width=100%，是每个格子充满 */}
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>{item.view_count}</Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateArticle(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;&nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}
