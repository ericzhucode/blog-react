import './index.less';
import logo from '../../assets/blogLogo.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/backgroundimg.jpg'

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
          <div className="home-header">
            <Link className="link" to={`/about`}>
              <img className="home-logo" src={logo} alt="Shu Shu Logo" />
            </Link>
          </div>
          <div className="home-body">
            <div className="introduce"> Shu Shu Blog </div>
            <div className="motto"> 如果事与愿违，一定另有安排 ！ </div>
            <hr class="seperator" />
            <div className="list">
              <Link className="link" to={`/articles`}>
                文章
              </Link>
              <Link className="link" to={`/project`}>
                项目
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                href={`hhttps://github.com/ericzhucode`}
              >
                github
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                href={`https://www.zhihu.com/people/zhu-gang-song/posts`}
              >
                知乎
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
