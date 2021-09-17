import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    // return <div>Loading...</div>;
    return <div />;
  } else {
    return null;
  }
};

let config = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../components/home/index.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('../components/articles/articles.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'message',
    path: '/message',
    exact: true,
    component: Loadable({
      loader: () => import('../components/message/message.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'about',
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('../components/about/about.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articleDetail',
    path: '/articleDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../components/about/about.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  }
];

export default config;
