// // import { useEffect, useState, useRef } from "react";
// // import { ToastContainer, toast } from "react-toastify";

// // import axios from "axios";
// // import { v4 as uuidv4 } from "uuid";

// // import { ChatState } from "../context/ChatProvider";
// // import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
// // import { toastOptions } from "../utils/constants";
// // import {
// //     isGroupRecieved,
// //     isAnotherSender,
// //     isLastMessage
// // } from "../config/ChatLogics";

// // import ChatInput from "./ChatInput";


// // function SingleChat({ fetchAgain, socket, setFetchAgain, selectedChat }) {
// //     const [messages, setMessages] = useState([]);
// //     const [socketConnected, setSocketConnected] = useState(false);
// //     const [newAttach, setNewAttach] = useState();
// //     const [loading, setLoading] = useState(false);
// //     const scrollRef = useRef();
// //     const { user } = ChatState();

// //     const sendMessage = async (msg) => {
// //         setLoading(true);
// //         try {
// //             const formData = new FormData();
// //             formData.append("sender", user._id);
// //             formData.append("chatId", selectedChat._id);

// //             if (newAttach) formData.append("attachment", newAttach, newAttach.name);

// //             if (msg.length > 0) {
// //                 formData.append("content", msg)
// //             } else {
// //                 formData.append("content", '')
// //             }
// //             const config = {
// //                 headers: {
// //                     Authorization: `Bearer ${user.token}`
// //                 }
// //             };
// //             const { data } = await axios.put(
// //                 `${sendMessageRoute}`,
// //                 formData,
// //                 config
// //             );
// //             socket.current.emit("new message", data);
// //             setMessages([...messages, data]);
// //             socket.current.emit("contacts", data.chat);
// //             setNewAttach();
// //             setLoading(false);
// //         } catch (error) {
// //             toast.error("Failed to send the Message", toastOptions);
// //         }
// //     };

// //     const fetchMessages = async () => {
// //         if (!selectedChat) return;
// //         try {
// //             const config = {
// //                 headers: {
// //                     Authorization: `Bearer ${user.token}`
// //                 }
// //             };
// //             const { data } = await axios.get(
// //                 `${recieveMessageRoute}/${selectedChat._id}`,
// //                 config
// //             );
// //             setMessages(data);
// //             socket.current.emit("join chat", selectedChat._id);
// //             socket.current.emit("contacts", data.chat);
// //         } catch (error) {
// //             toast.error("Failed to Load the Messages", toastOptions);
// //         }
// //     };


// //     useEffect(() => {
// //         fetchMessages(); // eslint-disable-next-line
// //     }, [selectedChat]);

// //     useEffect(() => {
// //         if (socket.current) {
// //             socket.current.on("connected", () => setSocketConnected(true));
// //         } // eslint-disable-next-line
// //     }, []);

// //     const func = (newMessageRecieved) => {
// //         if (newMessageRecieved !== undefined && newMessageRecieved !== null && newMessageRecieved.length !== 0) {
// //             setMessages([...messages, newMessageRecieved]);
// //             socket.current.emit("contacts", newMessageRecieved.chat);
// //         };
// //     };

// //     useEffect(() => {
// //         if (socket.current) {
// //             socket.current.on("message recieved", (newMessageRecieved) => {
// //                 func(newMessageRecieved);
// //             });
// //         };
// //     });

// //     useEffect(() => {
// //         scrollRef.current?.scrollIntoView();
// //     }, [messages]);

// //     return (
// //         <>
// //             <div className={`messages-container ${newAttach ? 'grid' : ''}`}>
// //                 <div className="chat-messages">
// //                     {messages ?
// //                         (messages.map((message, i) => {
// //                             return (
// //                                 <div ref={scrollRef} key={uuidv4()}>
// //                                     <div key={message._id}
// //                                         className={`message ${isGroupRecieved(message, selectedChat, user._id) ? "recieved-group" : ""} 
// //                                     ${isAnotherSender(message, user._id)
// //                                                 ? (isLastMessage(messages, message, i) ? "recieved margin-top" : "recieved")
// //                                                 : ("sended")}`}
// //                                     >
// //                                         <div className={`${isGroupRecieved(message, selectedChat, user._id) ? "sender-pic" : ""}`}>
// //                                             {isGroupRecieved(message, selectedChat, user._id) &&
// //                                                 isLastMessage(messages, message, i) &&
// //                                                 <img src={process.env.REACT_APP_PROFILE_PICS_PATHS + message.sender.profilePic}
// //                                                     alt={message.sender.username} />
// //                                             }
// //                                         </div>
// //                                         <div className="content">
// //                                             <div className="text-group">
// //                                                 {isGroupRecieved(message, selectedChat, user._id) &&
// //                                                     isLastMessage(messages, message, i, user._id) &&
// //                                                     <div className="sender-username">
// //                                                         <span>{message.sender.username}</span>
// //                                                     </div>
// //                                                 }
// //                                                 {message.content.length > 0
// //                                                     ? (<p className={`text 
// //                                                             ${isLastMessage(messages, message, i) ? "triangle" : ""}`}>
// //                                                         {message.content}
// //                                                     </p>)
// //                                                     : <></>}
// //                                                 {message.attachment.length > 0
// //                                                     ? (<img src={process.env.REACT_APP_ATTACHMENT_PATHS + message.attachment}
// //                                                         alt={message.sender.username} />)
// //                                                     : <></>}
// //                                             </div>
// //                                             <p className="time">
// //                                                 {message.createdAt.split(".")[0].split("T")[1].split(":", 2).join(":")}
// //                                             </p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         }))

// //                         : (loading &&
// //                             <div className="spinner-container chat-loading">
// //                                 <div className="loading-spinner">
// //                                 </div>
// //                             </div>
// //                         )
// //                     }
// //                 </div>
// //                 <ChatInput handleSendMsg={sendMessage} setNewAttach={setNewAttach} newAttach={newAttach} />
// //             </div>
// //             <ToastContainer />
// //         </>
// //     );
// // };

// // export default SingleChat;
// import { useEffect, useState, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import { ChatState } from "../context/ChatProvider";
// import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
// import { toastOptions } from "../utils/constants";
// import {
//   isGroupRecieved,
//   isAnotherSender,
//   isLastMessage
// } from "../config/ChatLogics";

// import ChatInput from "./ChatInput";

// function SingleChat({ socket, selectedChat }) {
//   const [messages, setMessages] = useState([]);
//   const [newAttach, setNewAttach] = useState();
//   const [loading, setLoading] = useState(false);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const scrollRef = useRef();
//   const { user } = ChatState();

//   const [messageSummarization, setMessageSummarization] = useState({});

//   const sendMessage = async (msg) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("sender", user._id);
//       formData.append("chatId", selectedChat._id);

//       if (newAttach) formData.append("attachment", newAttach, newAttach.name);

//       if (msg.length > 0) {
//         formData.append("content", msg)
//       } else {
//         formData.append("content", '')
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`
//         }
//       };
//       const { data } = await axios.put(
//         `${sendMessageRoute}`,
//         formData,
//         config
//       );
//       socket.current.emit("new message", data);
//       setMessages([...messages, data]);
//       socket.current.emit("contacts", data.chat);
//       setNewAttach();
//       setLoading(false);
//     } catch (error) {
//       toast.error("Failed to send the Message", toastOptions);
//     }
//   };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`
//         }
//       };
//       const { data } = await axios.get(
//         `${recieveMessageRoute}/${selectedChat._id}`,
//         config
//       );

//       const summarization = {};
//       data.forEach((message) => {
//         const senderId = String(message.sender._id);
//         if (!summarization[senderId]) {
//           summarization[senderId] = {
//             username: message.sender.username,
//             messages: [],
//           };
//         }
//         summarization[senderId].messages.push({
//           content: message.content,
//           timestamp: message.createdAt,
//         });
//       });

//       setMessages(data);
//       setMessageSummarization(summarization);

//       socket.current.emit("join chat", selectedChat._id);
//       socket.current.emit("contacts", data.chat);
//     } catch (error) {
//       toast.error("Failed to Load the Messages", toastOptions);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     // eslint-disable-next-line
//   }, [selectedChat]);

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("connected", () => setSocketConnected(true));
//     }
//     // eslint-disable-next-line
//   }, []);

//   const func = (newMessageRecieved) => {
//     if (
//       newMessageRecieved !== undefined &&
//       newMessageRecieved !== null &&
//       newMessageRecieved.length !== 0
//     ) {
//       setMessages([...messages, newMessageRecieved]);
//       socket.current.emit("contacts", newMessageRecieved.chat);
//     }
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("message recieved", (newMessageRecieved) => {
//         func(newMessageRecieved);
//       });
//     }
//   });

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView();
//   }, [messages]);

//   return (
//     <>
//       <div className={`messages-container ${newAttach ? 'grid' : ''}`}>
//         <div className="chat-messages">
//           {messages && messages.length > 0 ? (
//             messages.map((message, i) => (
//               <div ref={scrollRef} key={uuidv4()}>
//                 <div
//                   key={message._id}
//                   className={`message ${
//                     isGroupRecieved(message, selectedChat, user._id)
//                       ? "recieved-group"
//                       : ""
//                   } 
//                   ${
//                     isAnotherSender(message, user._id)
//                       ? isLastMessage(messages, message, i)
//                         ? "recieved margin-top"
//                         : "recieved"
//                       : "sended"
//                   }`}
//                 >
//                   <div
//                     className={`${
//                       isGroupRecieved(message, selectedChat, user._id)
//                         ? "sender-pic"
//                         : ""
//                     }`}
//                   >
//                     {isGroupRecieved(message, selectedChat, user._id) &&
//                       isLastMessage(messages, message, i) && (
//                         <img
//                           src={
//                             process.env.REACT_APP_PROFILE_PICS_PATHS +
//                             message.sender.profilePic
//                           }
//                           alt={message.sender.username}
//                         />
//                       )}
//                   </div>
//                   <div className="content">
//                     <div className="text-group">
//                       {isGroupRecieved(
//                         message,
//                         selectedChat,
//                         user._id
//                       ) &&
//                         isLastMessage(messages, message, i, user._id) && (
//                           <div className="sender-username">
//                             <span>{message.sender.username}</span>
//                           </div>
//                         )}
//                       {message.content.length > 0 ? (
//                         <p
//                           className={`text 
//                             ${
//                               isLastMessage(messages, message, i)
//                                 ? "triangle"
//                                 : ""
//                             }`}
//                         >
//                           {message.content}
//                         </p>
//                       ) : (
//                         <></>
//                       )}
//                       {message.attachment.length > 0 ? (
//                         <img
//                           src={
//                             process.env.REACT_APP_ATTACHMENT_PATHS +
//                             message.attachment
//                           }
//                           alt={message.sender.username}
//                         />
//                       ) : (
//                         <></>
//                       )}
//                     </div>
//                     <p className="time">
//                       {message.createdAt
//                         .split(".")[0]
//                         .split("T")[1]
//                         .split(":", 2)
//                         .join(":")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : loading ? (
//             <div className="spinner-container chat-loading">
//               <div className="loading-spinner"></div>
//             </div>
//           ) : null}
//         </div>
//         <ChatInput
//           handleSendMsg={sendMessage}
//           setNewAttach={setNewAttach}
//           newAttach={newAttach}
//         />
//       </div>

//       <div>
//         {Object.keys(messageSummarization).map((participantId) => (
//           <div key={participantId}>
//             <p>{messageSummarization[participantId].username}'s Summary:</p>
//             <ul>
//               {messageSummarization[participantId].messages.map(
//                 (msg, index) => (
//                   <li key={index}>
//                     {msg.content} - {msg.timestamp}
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>
//         ))}
//       </div>

//       <ToastContainer />
//     </>
//   );
// }

// export default SingleChat;

import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ChatState } from "../context/ChatProvider";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/constants";
import {
  isGroupRecieved,
  isAnotherSender,
  isLastMessage
} from "../config/ChatLogics";

import ChatInput from "./ChatInput";

function SingleChat({ socket, selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newAttach, setNewAttach] = useState();
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollRef = useRef();
  const { user } = ChatState();
  const [scrolling, setScrolling] = useState(false); // Add state for tracking scrolling
  const [repliedToUserId, setRepliedToUserId] = useState(null); // Track the replied-to user ID
  const [messageSummarization, setMessageSummarization] = useState({});

  const handleTapOnMessage = (message) => {
    setRepliedToUserId(message.sender._id);
  };
  const sendMessage = async (msg, repliedToMsgId) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("sender", user._id);
      formData.append("chatId", selectedChat._id);
      if (repliedToUserId) {
        formData.append("repliedTo", repliedToUserId);
        setRepliedToUserId(null); // Reset replied-to user ID after using it
      }

      if (newAttach) formData.append("attachment", newAttach, newAttach.name);

      if (msg.length > 0) {
        formData.append("content", msg);
      } else {
        formData.append("content", '');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${sendMessageRoute}`,
        formData,
        config
      );

      socket.current.emit("new message", data);
      setMessages([...messages, data]);
      socket.current.emit("contacts", data.chat);
      setNewAttach();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to send the Message", toastOptions);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${recieveMessageRoute}/${selectedChat._id}`,
        config
      );

      const summarization = {};
      data.forEach((message) => {
        const senderId = String(message.sender._id);
        if (!summarization[senderId]) {
          summarization[senderId] = {
            username: message.sender.username,
            messages: [],
          };
        }
        summarization[senderId].messages.push({
          content: message.content,
          timestamp: message.createdAt,
          repliedTo: message.repliedTo, // Include replied-to information
        });
      });

      setMessages(data);
      setMessageSummarization(summarization);

      socket.current.emit("join chat", selectedChat._id);
      socket.current.emit("contacts", data.chat);
    } catch (error) {
      toast.error("Failed to Load the Messages", toastOptions);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("connected", () => setSocketConnected(true));
    }
  }, []);

  const func = (newMessageRecieved) => {
    if (
      newMessageRecieved !== undefined &&
      newMessageRecieved !== null &&
      newMessageRecieved.length !== 0
    ) {
      setMessages([...messages, newMessageRecieved]);
      socket.current.emit("contacts", newMessageRecieved.chat);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message recieved", (newMessageRecieved) => {
        func(newMessageRecieved);
      });
    }
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);
  return (
    <>
      <div className={`messages-container ${newAttach ? 'grid' : ''}`}>
        <div className="chat-messages">
          {messages && messages.length > 0 ? (
            messages.map((message, i) => (
              <div
                ref={scrollRef}
                key={uuidv4()}
                onClick={() => handleTapOnMessage(message)}
              >
                {message.repliedTo && (
                  <div className="replied-message">
                    <p>Replied to:</p>
                    <p>{message.repliedTo.content}</p>
                  </div>
                )}
                <div
                  key={message._id}
                  className={`message ${
                    isGroupRecieved(message, selectedChat, user._id)
                      ? "recieved-group"
                      : ""
                  } 
                  ${
                    isAnotherSender(message, user._id)
                      ? isLastMessage(messages, message, i)
                        ? "recieved margin-top"
                        : "recieved"
                      : "sended"
                  }`}
                >
                  <div
                    className={`${
                      isGroupRecieved(message, selectedChat, user._id)
                        ? "sender-pic"
                        : ""
                    }`}
                  >
                    {isGroupRecieved(message, selectedChat, user._id) &&
                      isLastMessage(messages, message, i) && (
                        <img
                          src={
                            process.env.REACT_APP_PROFILE_PICS_PATHS +
                            message.sender.profilePic
                          }
                          alt={message.sender.username}
                        />
                      )}
                  </div>
                  <div className="content">
                    <div className="text-group">
                      {isGroupRecieved(
                        message,
                        selectedChat,
                        user._id
                      ) &&
                        isLastMessage(messages, message, i, user._id) && (
                          <div className="sender-username">
                            <span>{message.sender.username}</span>
                          </div>
                        )}
                      {message.content.length > 0 ? (
                        <p
                          className={`text 
                            ${
                              isLastMessage(messages, message, i)
                                ? "triangle"
                                : ""
                            }`}
                        >
                          {message.content}
                        </p>
                      ) : (
                        <></>
                      )}
                      {message.attachment.length > 0 ? (
                        <img
                          src={
                            process.env.REACT_APP_ATTACHMENT_PATHS +
                            message.attachment
                          }
                          alt={message.sender.username}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <p className="time">
                      {message.createdAt
                        .split(".")[0]
                        .split("T")[1]
                        .split(":", 2)
                        .join(":")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : loading ? (
            <div className="spinner-container chat-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : null}
        </div>
        <ChatInput
          handleSendMsg={(msg) => sendMessage(msg)}
          setNewAttach={setNewAttach}
          newAttach={newAttach}
        />
      </div>
  
      <div>
        {Object.keys(messageSummarization).map((participantId) => (
          <div key={participantId}>
            <p>{messageSummarization[participantId].username}'s Summary:</p>
            <ul>
              {messageSummarization[participantId].messages.map(
                (msg, index) => (
                  <li key={index}>
                    {msg.content} - {msg.timestamp}
                    {msg.repliedTo && (
                      <p>Replied to: {msg.repliedTo.content}</p>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
  
      <ToastContainer />
    </>
  );

//   return (
//     <>
//       <div className={`messages-container ${newAttach ? 'grid' : ''}`}>
//         <div className="chat-messages">
//           {messages && messages.length > 0 ? (
//             messages.map((message, i) => (
//               <div ref={scrollRef} key={uuidv4()}>
//                 {message.repliedTo && (
//                   <div className="replied-message">
//                     <p>Replied to:</p>
//                     <p>{message.repliedTo.content}</p>
//                   </div>
//                 )}
//                 <div
//                   key={message._id}
//                   className={`message ${
//                     isGroupRecieved(message, selectedChat, user._id)
//                       ? "recieved-group"
//                       : ""
//                   } 
//                   ${
//                     isAnotherSender(message, user._id)
//                       ? isLastMessage(messages, message, i)
//                         ? "recieved margin-top"
//                         : "recieved"
//                       : "sended"
//                   }`}
//                 >
//                   <div
//                     className={`${
//                       isGroupRecieved(message, selectedChat, user._id)
//                         ? "sender-pic"
//                         : ""
//                     }`}
//                   >
//                     {isGroupRecieved(message, selectedChat, user._id) &&
//                       isLastMessage(messages, message, i) && (
//                         <img
//                           src={
//                             process.env.REACT_APP_PROFILE_PICS_PATHS +
//                             message.sender.profilePic
//                           }
//                           alt={message.sender.username}
//                         />
//                       )}
//                   </div>
//                   <div className="content">
//                     <div className="text-group">
//                       {isGroupRecieved(
//                         message,
//                         selectedChat,
//                         user._id
//                       ) &&
//                         isLastMessage(messages, message, i, user._id) && (
//                           <div className="sender-username">
//                             <span>{message.sender.username}</span>
//                           </div>
//                         )}
//                       {message.content.length > 0 ? (
//                         <p
//                           className={`text 
//                             ${
//                               isLastMessage(messages, message, i)
//                                 ? "triangle"
//                                 : ""
//                             }`}
//                         >
//                           {message.content}
//                         </p>
//                       ) : (
//                         <></>
//                       )}
//                       {message.attachment.length > 0 ? (
//                         <img
//                           src={
//                             process.env.REACT_APP_ATTACHMENT_PATHS +
//                             message.attachment
//                           }
//                           alt={message.sender.username}
//                         />
//                       ) : (
//                         <></>
//                       )}
//                     </div>
//                     <p className="time">
//                       {message.createdAt
//                         .split(".")[0]
//                         .split("T")[1]
//                         .split(":", 2)
//                         .join(":")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : loading ? (
//             <div className="spinner-container chat-loading">
//               <div className="loading-spinner"></div>
//             </div>
//           ) : null}
//         </div>
//         <ChatInput
//           handleSendMsg={(msg) => sendMessage(msg, /* provide repliedToMsgId here */)}
//           setNewAttach={setNewAttach}
//           newAttach={newAttach}
//         />
//       </div>

//       <div>
//         {Object.keys(messageSummarization).map((participantId) => (
//           <div key={participantId}>
//             <p>{messageSummarization[participantId].username}'s Summary:</p>
//             <ul>
//               {messageSummarization[participantId].messages.map(
//                 (msg, index) => (
//                   <li key={index}>
//                     {msg.content} - {msg.timestamp}
//                     {msg.repliedTo && (
//                       <p>Replied to: {msg.repliedTo.content}</p>
//                     )}
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>
//         ))}
//       </div>

//       <ToastContainer />
//     </>
//   );
}

export default SingleChat;

