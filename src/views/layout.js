import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import Nav from '../components/nav/nav';
import Index from '../components/home/index';
import LeftSider from '../components/sider';
import { isMobileOrPc } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isMobile: false,
    };
  }

  componentDidMount() {
    if (isMobileOrPc()) {
      this.setState({
        isMobile: true,
      });
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    let pathName = this.props.location.pathname;

    let isIndexPage = false;
    if (pathName === '/') {
      isIndexPage = true;
    }
    return (
      <div className="Layouts">
        {!isIndexPage ? (
          <div>
            <Layout style={{ minHeight: '100vh' }}>
              {!this.state.isMobile ? (
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                  <LeftSider />
                </Sider>
              ) : ''}
              <Layout className="layout">
                <Nav pathname={this.props.location.pathname} isMobile={this.state.isMobile} />
                <Content>
                  <Layout style={{ padding: '24px 0', background: '#fff', width: '60%', margin: 'auto' }}>
                    <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                      {this.props.children}
                    </Content>
                  </Layout>
                </Content>
                <Footer style={{ textAlign: 'center', background: '#fff' }}>
                  前端练习生 ©2021 Created by Eric Shu
                </Footer>
              </Layout>
            </Layout>
            <BackTop />
          </div>
        ) : (
          <Index />
        )}
      </div>
    );
  }
}

export default Layouts;
