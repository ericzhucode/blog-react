import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import blogLogo from '../../assets/blogLogo.png';
import {
  CopyOutlined,
  RiseOutlined,
  CommentOutlined,
  ContactsOutlined
} from '@ant-design/icons';

class LeftSider extends Component {
  render() {
    return (
      <div className="sider">
        <div className="nav-logo" style={{ textAlign: 'center' }}>
          <a href="http://localhost:3005/">
            <img src={blogLogo} alt="" style={{ height: '100%', width: '50px', borderRadius: '25px' }} />
          </a>
        </div >
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<CopyOutlined />}>
            <Link to="/articles" >
              文章
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2">
            <Link to="/hot">
              <FireOutlined />
              热门
            </Link>
          </Menu.Item> */}
          <Menu.Item key="8" icon={<RiseOutlined />}>
            <Link to="/archive">
              归档
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="7">
            <Link to="/project">
              <ProjectOutlined />
              项目
            </Link>
          </Menu.Item> */}
          {/* <Menu.Item key="3">
                    <Link to="/timeLine">
                      <Icon type="hourglass" theme="outlined" />
                      历程
                    </Link>
                  </Menu.Item> */}
          <Menu.Item key="4" icon={<CommentOutlined />}>
            <Link to="/message">
              留言
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ContactsOutlined />}>
            <Link to="/about">
              关于
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default LeftSider;
