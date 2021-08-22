const io = require('socket.io')(9900, {
   cors: {
      origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (myDetail) => {
   const userIsExist = users.find((user) => user.userId === myDetail.userId);
   const index = users.indexOf(userIsExist);

   console.log('---------------------------');
   console.log('User Exist: ', userIsExist);
   console.log('Index User Exist: ', index);
   console.log('---------------------------');

   if (!userIsExist && parseInt(index) === -1) {
      users.push(myDetail);
      return console.log('User in Socket Server (!userIsExist): ', users);
   }

   if (userIsExist) {
      users.splice(index, 1);
      users.push(myDetail);

      console.log('User in Socket Server (userIsExist): ', users);
   }
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
   return users.find((user) => user.userId === userId);
};

//enable Socket Server
io.on('connection', (socket) => {
   //get SocketId & UserId when user connected
   socket.on('myDetail', (currentUserId) => {
      const myDetail = {
         userId: currentUserId,
         socketId: socket.id,
      };
      addUser(myDetail);
      console.log('User connected: ', users);
   });

   //get message at client
   socket.on('message', (clientMessage) => {
      console.log('Message from client: ', clientMessage);

      const receiverSocketId = getUser(clientMessage.receiver);

      if (!receiverSocketId) return;
      io.to(receiverSocketId.socketId).emit('messageToReceiver', {
         sender: clientMessage.sender,
         text: clientMessage.text,
         conversationId: clientMessage.conversationId,
         createdAt: clientMessage.createdAt,
      });
   });

   //remove SocketId & UserId when user disconnected
   socket.on('disconnect', () => {
      console.log('user is disconnected');

      removeUser(socket.id);
      console.log('User disconnected: ', users);
   });
});
