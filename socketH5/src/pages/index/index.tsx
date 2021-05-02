import React, { FC, useEffect, useState, useRef } from 'react';
import { List, InputItem } from 'antd-mobile';
import io from 'socket.io-client';
import './index.less';

interface HomePageProps {
  location: any;
}

const random = () => Math.random().toString(36).substring(7);

const HomePage: FC<HomePageProps> = ({ location }) => {
  const { name = '' } = location.query;
  const [inputValue, setInputValue] = useState<string>(''); // 输入框值
  const [socket] = useState<any>(io('http://localhost:3000', { transports: ['websocket'] }));
  const [chatList, setChatList] = useState<any[]>([]); // 聊天列表

  const chatListRef = useRef<any[]>([]);

  useEffect(() => {
    chatListRef.current = chatList;
    setChatList(chatList);
  }, [chatList]);

  useEffect(() => {
    socket.on('message', (msg: any) => {
      setChatList([...chatListRef.current, msg]);
      chatListRef.current = [...chatListRef.current, msg];
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit('message', {
      id: random(),
      name,
      type: 'text',
      message: inputValue,
    });
    setInputValue('');
  };

  return (
    <div className="chatListStyle">
      <div className="chat">
        {chatList.map((item) => (
          <div
            key={item?.id}
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
            onExtraClick={sendMessage}
          />
        </List>
      </div>
    </div>
  );
};

export default HomePage;
