import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Layout,
  Icon,
  Menu,
  Row,
  Col,
  Button,
  Drawer,
  message,
} from 'antd';
import {
  FireOutlined,
  CodeOutlined,
  ProjectOutlined,
  CommentOutlined,
  ContactsOutlined,
  BarsOutlined,
  CarOutlined,
  EditOutlined
} from '@ant-design/icons';
import Register from '../register/register';
import Login from '../login/login';
import { getQueryStringByName } from '../../utils/utils';
import https from '../../utils/https';
import urls from '../../utils/urls';
import { loginSuccess, loginFailure } from '../../store/actions/user';
import LoadingCom from '../loading/loading';
import logo from '../../assets/blogLogo.png';
import blogLogo from '../../assets/blogLogo.png';
const { Header } = Layout;

@connect(
  state => state.user,
  { loginSuccess, loginFailure },
)
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: 'top',
      current: null,
      menuCurrent: '',
      login: false,
      register: false,
      nav: '首页',
      navTitle: '首页',
      code: '',
      isLoading: false,
    };
    this.menuClick = this.menuClick.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showRegisterModal = this.showRegisterModal.bind(this);
    this.handleLoginCancel = this.handleLoginCancel.bind(this);
    this.handleRegisterCancel = this.handleRegisterCancel.bind(this);
    this.initNav = this.initNav.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  componentDidMount() {
    const code = getQueryStringByName('code');
    if (code) {
      this.setState(
        {
          code,
        },
        () => {
          if (!this.state.code) {
            return;
          }
          this.getUser(this.state.code);
        },
      );
    }
    console.log(this.props);
    this.initNav(this.props.pathname);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  initNav(name) {
    let key = '';
    let navTitle = '';
    if (name === '/articles') {
      key = '1';
      navTitle = '技术';
    } else if (name === '/travel') {
      key = '2';
      navTitle = '旅游';
    } else if (name === '/notes') {
      key = '3';
      navTitle = '随笔';
    } else if (name === '/archive') {
      key = '4';
      navTitle = '归档';
    } else if (name === '/hot') {
      key = '5';
      navTitle = '热门';
    } else if (name === '/message') {
      key = '6';
      navTitle = '留言';
    } else if (name === '/about') {
      key = '7';
      navTitle = '关于';
    }
    console.log('menuCurrent', key);
    this.setState({
      navTitle,
      menuCurrent: key,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.initNav(nextProps.pathname);
  }

  getUser(code) {
    this.setState({
      isLoading: true,
    });
    https
      .post(
        urls.getUser,
        {
          code,
        },
        { withCredentials: true },
      )
      .then(res => {
        this.setState({
          isLoading: false,
        });
        if (res.status === 200 && res.data.code === 0) {
          this.props.loginSuccess(res.data);
          let userInfo = {
            _id: res.data.data._id,
            name: res.data.data.name,
            avatar: res.data.data.avatar,
          };
          window.sessionStorage.userInfo = JSON.stringify(userInfo);
          message.success(res.data.message, 1);
          this.handleLoginCancel();
          // 跳转到之前授权前的页面
          let preventHistory = JSON.parse(window.sessionStorage.preventHistory);
          if (preventHistory) {
            this.props.history.push({
              pathname: preventHistory.pathname,
              search: preventHistory.search,
            });
          }
        } else {
          this.props.loginFailure(res.data.message);
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.log(err);
      });
  }

  handleMenu = e => {
    // console.log('click ', e);
    this.setState({
      menuCurrent: e.key,
    });
  };

  handleLogout = e => {
    this.setState({
      current: e.key,
    });
    window.sessionStorage.userInfo = '';
    this.onClose();
  };

  showLoginModal() {
    this.onClose();
    this.setState({
      login: true,
    });
  }
  showRegisterModal() {
    this.onClose();
    this.setState({
      register: true,
    });
  }
  handleLoginCancel() {
    this.setState({
      login: false,
    });
  }
  handleRegisterCancel() {
    this.setState({
      register: false,
    });
  }
  menuClick({ key }) {
    this.setState({
      nav: key,
    });
  }
  render() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    const { menuCurrent } = this.state

    return (
      <div className="left">
        {this.props.isMobile ? (
          <Header
            className="header"
            style={{
              position: 'fixed',
              zIndex: 1,
              top: 0,
              width: '100%',
              height: '64px',
              float: 'left',
              backgroundColor: 'white',
              borderBottom: '1px solid #eee',
            }}
          >
            <Row className="container">
              <Col style={{ width: '25%', float: 'left', lineHeight: '64px' }}>
                <Link to="/">
                  <div className="logo">
                    <img src={logo} alt="" />
                  </div>
                </Link>
              </Col>
              <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                <div className="nav-title"> {this.state.navTitle} </div>
              </Col>
              <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                <div>
                  <BarsOutlined
                    onClick={this.showDrawer}
                    style={{
                      fontSize: '40px',
                      marginRight: '20px',
                      marginTop: '13px',
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Header>
        ) : (
          <div className="sider">
            <div className="nav-logo" style={{ textAlign: 'center' }}>
              <Link to="/" >
                <img src={blogLogo} alt="" style={{ width: '40%', borderRadius: '25px' }} />
              </Link>
              <p className="name">
                Shu Shu
              </p>
              <p>
                Creative Code, Create Life
              </p>
              <p>
                Frontend Software Engineer + SRE
              </p>
            </div>
            <div className="nav">
              <Menu theme="light" selectedKeys={[menuCurrent]} mode="inline">
                <Menu.Item key="1" icon={<CodeOutlined />}>
                  <Link to="/articles" >
                    技术
                  </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CarOutlined />}>
                  <Link to="/travel">
                    旅游
                  </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<EditOutlined />}>
                  <Link to="/notes">
                    随笔
                  </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<ProjectOutlined />}>
                  <Link to="/archive">
                    归档
                  </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<FireOutlined />}>
                  <Link to="/hot">
                    热门
                  </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<CommentOutlined />}>
                  <Link to="/message">
                    留言
                  </Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<ContactsOutlined />}>
                  <Link to="/about">
                    关于
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
            <div className="login">
              <Menu>
                {userInfo ? (
                  <Menu.Item key="1">
                    <Button
                      type="primary"
                      onClick={this.handleLogout}
                    >
                      退出
                    </Button>
                  </Menu.Item>
                ) : (
                  <Menu.Item key="1">
                    <Button
                      type="primary"
                      onClick={this.showLoginModal}
                    >
                      登录 / 注册
                    </Button>
                  </Menu.Item>
                )}
              </Menu>
            </div>
          </div>
        )}
        <Drawer
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height={420}
        >
          <div className="drawer">
            <p onClick={this.onClose}>
              <Link to="/">
                <Icon type="home" /> 首页
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/articles">
                <Icon type="ordered-list" /> 文章
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/hot">
                <Icon type="fire" onClick={this.showLoginModal} /> 热门
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/archive">
                <Icon type="project" onClick={this.showLoginModal} /> 归档
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/project">
                <Icon type="project" onClick={this.showLoginModal} /> 项目
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/timeLine">
                <Icon type="hourglass" onClick={this.showLoginModal} /> 历程
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/message">
                <Icon type="message" onClick={this.showLoginModal} /> 留言
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/about">
                <Icon type="user" onClick={this.showLoginModal} /> 关于
              </Link>
            </p>

            {userInfo ? (
              <div onClick={this.handleLogout}>
                <p>{userInfo.name}</p>
                <p>
                  <Icon type="logout" /> 退出{' '}
                </p>
              </div>
            ) : (
              <div>
                <p onClick={this.showLoginModal}>
                  <Icon type="login" /> 登录
                </p>
                <p onClick={this.showRegisterModal}>
                  <Icon type="registry" /> 注册{' '}
                </p>
              </div>
            )}
          </div>
        </Drawer>
        <Login
          visible={this.state.login}
          handleCancel={this.handleLoginCancel}
          getMsg={this.showRegisterModal}
        />
        <Register
          visible={this.state.register}
          handleCancel={this.handleRegisterCancel}
        />
        {this.state.isLoading ? (
          <div style={{ marginTop: 100 }}>
            <LoadingCom />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
