import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import Nav from '../components/nav/nav';
import Index from '../components/home/index';
import { isMobileOrPc } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    if (isMobileOrPc()) {
      this.setState({
        isMobile: true
      });
    }
  }

  render() {
    const pathName = this.props.location.pathname;
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
                <Sider width={300} style={{ background: "transparent", borderRight: "1px solid rgba(80, 79, 79, 0.151)" }}>
                  <Nav pathname={this.props.location.pathname} isMobile={this.state.isMobile} />
                  <Footer style={{ textAlign: 'center', background: "transparent" }}>
                    <p>面向md文档编程的一年</p>
                    <p>©2021 Created by Eric Shu</p>
                  </Footer>
                </Sider>
              ) : ''}
              <Layout className="layout">
                {this.state.isMobile ? (
                  <Nav pathname={this.props.location.pathname} isMobile={this.state.isMobile} />
                ) : ''}
                <Content>
                  <Layout style={{ margin: '30px auto', background: "transparent" }}>
                    <Content>
                      {this.props.children}
                    </Content>
                  </Layout>
                </Content>
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
