import { ResponseError, Context } from 'umi-request';
import {
  NavBarProps,
  TitleListItem,
  NavBarListItem,
  TabBarProps,
  TabBarListItem,
  history,
} from 'alita';

// 请求中间件 就是发起请求和响应之后需要统一操作数据就写这
// https://github.com/umijs/umi-request#example-1
const middleware = async (ctx: Context, next: any) => {
  // 可以在这写一些请求前做的事情 操作ctx.req
  await next();
  // 可以在这里对响应数据做一些操作 操作ctx.res
};

export const request = {
  prefix: '', // 统一的请求头
  middlewares: [middleware],
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '聊天室',
  },
];

const navList: NavBarListItem[] = [
  {
    pagePath: '/',
    navBar: {},
  },
];

const navBar: NavBarProps = {
  mode: 'dark',
  navList,
  fixed: true,
  onLeftClick: () => {
    history.goBack();
  },
};

const tabList: TabBarListItem[] = [];

const tabBar: TabBarProps = {
  color: `#696D6C`,
  selectedColor: '#3562AD',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};
