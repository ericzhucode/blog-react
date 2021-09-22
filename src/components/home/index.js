import './index.less';
import logo from '../../assets/blogLogo.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/background-home.jpg'
import {
  GithubOutlined,
  ZhihuOutlined,
  MailOutlined
} from '@ant-design/icons';

// var sectionStyle = {
//   width: "100%",
//   height: "400px",
//   // makesure here is String确保这里是一个字符串，以下是es6写法
//   backgroundImage: `url(${Background})`
// };

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home">
        <div className="bgimg" style={{ background: `url(${Background}) no-repeat center center fixed`, backgroundSize: "cover" }}></div>
        <div className="content">
          <div className="wrapper">
            <div className="home-header">
              <Link className="link" to={`/about`}>
                <img className="home-logo" src={logo} alt="Shu Logo" />
              </Link>
            </div>
            <div className="home-body">
              <div className="introduce"> Shu Blog </div>
              {/* 不做开发，死不瞑目
              加班到天明，学习到昏厥 */}
              <div className="motto"> 如果事与愿违，一定另有安排 ！ </div>
              <hr className="seperator" />
              <div className="list-internal">
                <Link className="link" to={`/articles`}>
                  技术
                </Link>
                <Link className="link" to={`/travel`}>
                  旅游
                </Link>
                <Link className="link" to={`/notes`}>
                  随笔
                </Link>
                <Link className="link" to={`/about`}>
                  关于
                </Link>
              </div>
              <div className="list-external">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href={`https://github.com/ericzhucode`}
                  title="github"
                >
                  <GithubOutlined />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href={`https://www.zhihu.com/people/zhu-gang-song/posts`}
                  title="知乎"
                >
                  <ZhihuOutlined />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                  href={`mailto:zhugangsong1997@163.com`}
                  title="邮箱"
                >
                  <MailOutlined />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
