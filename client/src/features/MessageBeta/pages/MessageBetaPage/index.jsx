// import {
//    Avatar,
//    ChatContainer,
//    ConversationHeader,
//    ConversationList,
//    ExpansionPanel,
//    InfoButton,
//    MainContainer,
//    MessageInput,
//    MessageList,
//    Search,
//    Sidebar,
// } from '@chatscope/chat-ui-kit-react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { Image, Row, Col } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
// import shortid from 'shortid';
// import { io } from 'socket.io-client';
// import conversationApi from '../../../../api/conversationApi';
// import userApi from '../../../../api/userApi';
// import { storage } from '../../../../firebase';
// import Conversations from '../../components/Conversations';
// import ImageModal from '../../components/ImageModal';
// import Messages from '../../components/Messages';
// import { newMessage } from '../../messageSlice';
// import './MessageBetaPage.scss';

// function MessageBetaPage(props) {
//    const socket = useRef();
//    const dispatch = useDispatch();
//    const location = useLocation();

//    const currentUserId = useSelector((state) => state.users.id);
//    const reduxIncomingMessage = useSelector((state) => state.messages[0]);

//    const [page, setPage] = useState(1);
//    const [messageInputValue, setMessageInputValue] = useState('');
//    const [friendInfo, setFriendInfo] = useState([]);
//    const [conversations, setConversations] = useState([]);
//    const [messages, setMessages] = useState([]);
//    const [isModalVisible, setIsModalVisible] = useState(false);
//    const [mediaPhotoList, setMediaPhotoList] = useState([]);
//    const [selectedConversation, setSelectedConversation] = useState(
//       location.state?.conversationInfo || ''
//    );

//    const ref = useRef(page);

//    useEffect(() => {
//       if (!currentUserId) return;

//       //connect to Socket Server
//       socket.current = io('ws://localhost:9900');

//       //get message from Socket Server
//       socket.current.on('messageToReceiver', (message) => {
//          const action = newMessage({
//             id: shortid.generate(),
//             sender: message.sender,
//             text: message.text,
//             conversationId: message.conversationId,
//             createdAt: message.createdAt,
//          });
//          dispatch(action);
//       });
//       // eslint-disable-next-line
//    }, [currentUserId]);

//    useEffect(() => {
//       if (
//          !reduxIncomingMessage ||
//          !selectedConversation.members?.includes(reduxIncomingMessage.sender)
//       )
//          return;
//       setMessages((prevMessages) => [...prevMessages, reduxIncomingMessage]);
//    }, [reduxIncomingMessage, selectedConversation.members]);

//    useEffect(() => {
//       if (!reduxIncomingMessage) return;
//       setConversations((prev) => {
//          const filterConversation = prev?.find(
//             (m) => m.id === reduxIncomingMessage.conversationId
//          );
//          if (filterConversation) {
//             if (filterConversation.messages.length > 0) {
//                filterConversation.messages[0].text = reduxIncomingMessage.text;
//                filterConversation.messages[0].createdAt =
//                   reduxIncomingMessage.createdAt;
//             } else {
//                filterConversation.messages.push({
//                   text: reduxIncomingMessage.text,
//                   createdAt: reduxIncomingMessage.createdAt,
//                });
//             }
//          }

//          prev.sort((a, b) => {
//             return (
//                new Date(b.messages[0]?.createdAt) -
//                new Date(a.messages[0]?.createdAt)
//             );
//          });

//          return [...prev];
//       });
//    }, [reduxIncomingMessage]);

//    useEffect(() => {
//       if (!currentUserId) return;

//       //send my userId to Socket Server
//       socket.current.emit('myDetail', currentUserId);
//    }, [currentUserId]);

//    useEffect(() => {
//       if (!currentUserId) return;
//       const array2Sorted = [reduxIncomingMessage?.sender, currentUserId]
//          .slice()
//          .sort();
//       const check = conversations.map((c) => {
//          return c.members
//             .slice()
//             .sort()
//             .every(function (value, index) {
//                return value === array2Sorted[index];
//             });
//       });
//       if (check.find((i) => i === true)) return;
//       try {
//          const getConversation = async () => {
//             const response = await conversationApi.getConversationBeta(
//                currentUserId
//             );
//             response.sort((a, b) => {
//                return (
//                   new Date(b.messages[0]?.createdAt) -
//                   new Date(a.messages[0]?.createdAt)
//                );
//             });
//             setConversations(response);
//          };
//          getConversation();
//       } catch (error) {
//          return console.log(error);
//       }
//       // eslint-disable-next-line
//    }, [currentUserId, reduxIncomingMessage]);

//    useEffect(() => {
//       setPage(1);
//       setMessages([]);
//    }, [selectedConversation]);

//    useEffect(() => {
//       if (!selectedConversation) return;
//       if (page > 1) {
//          if (ref.current === page) return;
//       }
//       const getMessagesByConversationId = async () => {
//          try {
//             const response = await conversationApi.getMessageBeta(
//                selectedConversation.id,
//                page
//             );
//             response.sort((a, b) => {
//                return new Date(a.createdAt) - new Date(b.createdAt);
//             });

//             setMessages((prev) => [...response, ...prev]);
//          } catch (error) {
//             console.log(error);
//          }
//       };
//       getMessagesByConversationId();
//    }, [selectedConversation, page]);

//    useEffect(() => {
//       ref.current = page;
//    }, [page]);

//    const handleOnClickConversation = async (conversation) => {
//       setSelectedConversation(conversation);
//       setMediaPhotoList([]);
//       const friend = conversation.members?.find(
//          (member) => member !== currentUserId
//       );

//       try {
//          const response = await userApi.getUserProfile({
//             firebaseId: friend,
//          });
//          setFriendInfo(response);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const handleOnSendMessage = async (sendImage) => {
//       try {
//          const messageDataDb = {
//             text: messageInputValue || sendImage,
//             conversationId: selectedConversation.id,
//             sender: currentUserId,
//          };

//          const messageDataSocket = {
//             conversationId: selectedConversation.id,
//             createdAt: new Date(),
//             text: messageInputValue || sendImage,
//             sender: currentUserId,
//             receiver:
//                friendInfo.firebaseId ||
//                location.state?.conversationUserInfo.firebaseId,
//          };

//          socket.current.emit('message', messageDataSocket);

//          const response = await conversationApi.sendMessage(messageDataDb);
//          setMessages([...messages, response]);

//          //update new messages to latest messages on conversation list
//          setConversations((prev) => {
//             const filterConversation = prev.find(
//                (m) => m.id === response.conversationId
//             );
//             if (filterConversation.messages.length > 0) {
//                filterConversation.messages[0].text = response.text;
//                filterConversation.messages[0].createdAt = response.createdAt;
//             } else {
//                filterConversation.messages.push({
//                   text: response.text,
//                   createdAt: response.createdAt,
//                });
//             }

//             prev.sort((a, b) => {
//                return (
//                   new Date(b.messages[0]?.createdAt) -
//                   new Date(a.messages[0]?.createdAt)
//                );
//             });
//             return [...prev];
//          });
//       } catch (error) {
//          console.log(error);
//       }

//       setMessageInputValue('');
//    };

//    const handleModalVisible = () => {
//       setIsModalVisible(false);
//    };

//    const getMediaInConversation = () => {
//       const ref = storage.ref(
//          `messages/${selectedConversation.id}/messageImage`
//       );
//       ref.listAll().then((res) => {
//          res.items.forEach((itemRef) => {
//             itemRef.getDownloadURL().then((url) =>
//                setMediaPhotoList((prev) => {
//                   prev.push(url);

//                   return [...new Set(prev)];
//                })
//             );
//          });
//       });
//    };

//    return (
//       <div className='message'>
//          <MainContainer responsive>
//             <Sidebar position='left' scrollable={false}>
//                <Search placeholder='Search...' />
//                <ConversationList position='left' scrollable={false}>
//                   {conversations.map((conversation) => (
//                      <Conversations
//                         key={conversation.id}
//                         conversation={conversation}
//                         currentUserId={currentUserId}
//                         handleOnClickConversation={handleOnClickConversation}
//                         selectedConversationId={selectedConversation?.id}
//                         lastMessage={conversation.messages[0]?.text}
//                      />
//                   ))}
//                </ConversationList>
//             </Sidebar>

//             {!selectedConversation ? (
//                <MessageList>
//                   <MessageList.Content className='emptySelectedConversation'>
//                      Choose conversation to start chat
//                   </MessageList.Content>
//                </MessageList>
//             ) : (
//                <>
//                   <ChatContainer>
//                      <ConversationHeader>
//                         <ConversationHeader.Back
//                            onClick={() => setSelectedConversation('')}
//                         />
//                         <Avatar
//                            src={
//                               friendInfo?.photoURL ||
//                               location.state?.conversationUserInfo.photoURL
//                            }
//                            name={
//                               friendInfo?.username ||
//                               location.state?.conversationUserInfo.username
//                            }
//                         />
//                         <ConversationHeader.Content
//                            userName={
//                               friendInfo?.username ||
//                               location.state?.conversationUserInfo.username
//                            }
//                         />
//                         <ConversationHeader.Actions>
//                            <Link to={`/profile/${friendInfo?.firebaseId}`}>
//                               <InfoButton />
//                            </Link>
//                         </ConversationHeader.Actions>
//                      </ConversationHeader>
//                      <MessageList>
//                         <div
//                            id='scrollableDiv'
//                            className='messageInfinityScroll'
//                         >
//                            <InfiniteScroll
//                               dataLength={messages?.length}
//                               next={() => setPage(page + 1)}
//                               inverse={true}
//                               hasMore={true}
//                               scrollableTarget='scrollableDiv'
//                            >
//                               {messages?.map((message) => (
//                                  <Messages
//                                     key={message.id}
//                                     message={message}
//                                     friendInfo={friendInfo}
//                                     currentUserId={currentUserId}
//                                     redirectData={
//                                        location.state?.conversationUserInfo
//                                     }
//                                  />
//                               ))}
//                            </InfiniteScroll>
//                         </div>
//                      </MessageList>
//                      <MessageInput
//                         placeholder='Type message here'
//                         value={messageInputValue}
//                         onChange={(val) => setMessageInputValue(val)}
//                         onSend={handleOnSendMessage}
//                         onAttachClick={() => setIsModalVisible(true)}
//                      />
//                   </ChatContainer>
//                   <Sidebar position='right'>
//                      <ExpansionPanel
//                         title='Media'
//                         onClick={() => getMediaInConversation()}
//                      >
//                         <Row flex='none' align='middle' gutter={[8, 8]}>
//                            {mediaPhotoList?.map((p) => (
//                               <Col key={p}>
//                                  <Image src={p} width={60} />
//                               </Col>
//                            ))}
//                         </Row>
//                      </ExpansionPanel>
//                   </Sidebar>
//                </>
//             )}
//          </MainContainer>
//          <ImageModal
//             isModalVisible={isModalVisible}
//             handleModalVisible={handleModalVisible}
//             selectedConversation={selectedConversation}
//             handleOnSendMessage={handleOnSendMessage}
//             setMessageInputValue={setMessageInputValue}
//          />
//       </div>
//    );
// }

// export default MessageBetaPage;
