import React, { useState, useEffect } from "react";
import { marked } from "marked"; //这里得用{}导出，因为现在已经不是默认导出了
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import servicePath from "../config/apiUrl";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select; //解析出下拉框的每一项
const { TextArea } = Input;

export default function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改,setArticleId触发render更新且修改articleId的值
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("内容预览"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("简介预览"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期,不知道初始值是啥就不填
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  // 它这拉条是和初始值一样宽度的
  const [selectedType, setSelectType] = useState("请选择类型"); //选择的文章类别,最后选择的是value，即number值而不是具体类型
  const navigate = useNavigate();
  const { id } = useParams(); //现在要用这个钩子了,用的是params参数

  useEffect(() => {
    getTypeInfo();
    // 获取文章ID(url上会有变化)
    // console.log(props);
    // let tmpId = props.match.params.id;
    if (id) {
      setArticleId(id);
      getArticleById(id);
    }
  }, []);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true, //启动类似Github样式的Markdown,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true, //支持Github形式的表格，必须打开gfm选项
    breaks: false, //支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, //优化列表输出，这个填写true之后，你的样式会好看很多，所以建议设置成true
    smartpants: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    // 这里如果用introduced会慢一步，不知道为啥
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const saveArticle = () => {
    if (selectedType === "请选择类型") {
      message.error("必须选择文章类型");
      return false;
    }
    if (!articleTitle) {
      message.error("博客标题不能为空");
      return false;
    }
    if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    }
    if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    }
    if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    // 注意key值要和数据库中一样
    let dateText = showDate.replace("-", "/");
    let articleContent_tmp = articleContent.replace(/%/g, "%25"); //防止乱码(乱码导致原因为字符串中出现了%)
    articleContent_tmp = articleContent.replace(/&/g, "地址符BUG"); //&此字符上传过程丢失
    articleContent_tmp = articleContent.replace(/[+]/g, "加号符BUG"); //+此字符上传过程丢失
    setArticleContent(articleContent_tmp);
    // let introducemd = this.state.introducemd; //简介的markdown内容
    let introducemd_tmp = introducemd.replace(/%/g, "%25"); //防止乱码(乱码导致原因为字符串中出现了%)
    introducemd_tmp = introducemd.replace(/&/g, "地址符BUG"); //&此字符上传过程丢失
    introducemd_tmp = introducemd.replace(/[+]/g, "加号符BUG"); //+此字符上传过程丢失
    setIntroducemd(introducemd_tmp);
    let dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: new Date(dateText).getTime() / 1000,
    };
    if (articleId === 0) {
      // 说明是新增加
      dataProps.view_count = 0;
      console.log(dataProps);
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        // 这里有设置文章id,新增加文章id肯定要变
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      dataProps.id = articleId;
      // 用restful风格，这里要是update
      axios({
        method: "post",
        url: servicePath.updateArticle,
        data: dataProps,
        // 支持远程cookie访问
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("文章修改成功");
        } else {
          message.error("修改失败");
        }
      });
    }
  };

  const postArticle = () => {
    if (selectedType === "请选择类型") {
      message.error("必须选择文章类型");
      return false;
    }
    if (!articleTitle) {
      message.error("博客标题不能为空");
      return false;
    }
    if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    }
    if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    }
    if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    // 注意key值要和数据库中一样
    let dateText = showDate.replace("-", "/");
    let articleContent_tmp = articleContent.replace(/%/g, "%25"); //防止乱码(乱码导致原因为字符串中出现了%)
    articleContent_tmp = articleContent.replace(/&/g, "地址符BUG"); //&此字符上传过程丢失
    articleContent_tmp = articleContent.replace(/[+]/g, "加号符BUG"); //+此字符上传过程丢失
    setArticleContent(articleContent_tmp);
    // let introducemd = this.state.introducemd; //简介的markdown内容
    let introducemd_tmp = introducemd.replace(/%/g, "%25"); //防止乱码(乱码导致原因为字符串中出现了%)
    introducemd_tmp = introducemd.replace(/&/g, "地址符BUG"); //&此字符上传过程丢失
    introducemd_tmp = introducemd.replace(/[+]/g, "加号符BUG"); //+此字符上传过程丢失
    setIntroducemd(introducemd_tmp);
    let dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: new Date(dateText).getTime() / 1000,
    };
    axios({
      method: "post",
      url: servicePath.addArticle,
      data: dataProps,
      withCredentials: true,
    })
      .then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      })
      .catch((error) => {
        message.error("服务器端炸裂" + error);
      });
  };

  const getTypeInfo = (props) => {
    axios({
      method: "GET",
      url: servicePath.getTypeInfo,
      // 这是两次通讯，第一次来证明是否登录，第二次通过登录状态判断是否应该导出该路由
      // getItem获取，removeItem删除
      // data: localStorage.getItem("openId"),
      // 跨域cookie,允许cookie跨域，就能允许session共享了
      withCredentials: true,
    }).then((res) => {
      // 如果接口访问不通，就说明没有登录，返回原始界面
      // session存储在服务端，客户端时没有办法访问到session.id的
      if (res.data.data === "没有登录") {
        localStorage.removeItem("openId");
        navigate("/"); //返回登录界面
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  // 修改文章的时候，把原来的内容显示出来
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
    }).then((res) => {
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      for (let typeid of typeInfo) {
        // console.log(typeid);
        // console.log(typeid.Id, res.data.data[0].typeId);
        if (typeid.Id === res.data.data[0].typeId) {
          setSelectType(typeid.typeName);
          return;
        }
      }
      // console.log(selectedType);
    });
  };
  return (
    <div>
      {/* {console.log(selectedType)} */}
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={(value) => setSelectType(value)}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.orderNum}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              {/* 这里是必须得打字才能重新修改渲染页面了,标题是## ，注意还有个空格 */}
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span="24">
              {/* 这里的暂存会影响到数据库的 */}
              <Button size="large" onClick={saveArticle}>
                修改文章
              </Button>
              &nbsp;
              {/* 检验文章内容是否完整，这里是onClick而不是onChange */}
              <Button type="primary" size="large" onClick={postArticle}>
                发布文章
              </Button>
            </Col>
            <Col span="24">
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  // datepicker自带的参数吗?
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
