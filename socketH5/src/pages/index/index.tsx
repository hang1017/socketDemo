import React, { FC, useEffect, useState } from 'react';
import { List, InputItem } from 'antd-mobile';
import './index.less';

interface HomePageProps {
  location: any;
}

const HomePage: FC<HomePageProps> = ({ location }) => {
  const { name = '' } = location.query;
  const [inputValue, setInputValue] = useState<string>(''); // 输入框值
  const [chatList, setChatList] = useState<any[]>([
    { id: '1', name: '明', type: 'text', message: '我叫小明' },
    { id: '2', name: '红', type: 'text', message: '我叫小红' },
    { id: '3', name: '明', type: 'text', message: '你好，很高兴认识你' },
  ]); // 聊天列表
  return (
    <div className="chatListStyle">
      <div className="chat">
        {chatList.map((item) => (
          <div
            className="item"
            style={{ justifyContent: item.name === name ? 'flex-end' : 'flex-start' }}
          >
            {item.name !== name && <div className="name">{item?.name}</div>}
            <div className="messageContent">
              <div className="message">{item?.message}</div>
            </div>
            {item.name === name && <div className="name">{item?.name}</div>}
          </div>
        ))}
      </div>
      <div className="inputStyle">
        <List>
          <InputItem
            placeholder="请输入您要发送的内容"
            extra="发送"
            value={inputValue}
            onChange={(e) => setInputValue(e)}
          />
        </List>
      </div>
    </div>
  );
};

export default HomePage;
