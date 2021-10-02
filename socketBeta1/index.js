const io = require('socket.io')(9900, {
   cors: {
      origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (myDetail) => {
   const find = users.findIndex((user) => user.userId === myDetail.userId);
   if (find === -1) {
      users.push(myDetail);
      return console.log('List: ', users);
   } else {
      users[find].socketId = myDetail.socketId;
      return console.log('List: ', users);
   }
};

const getUser = (receiverUserId) => {
   return users.find((user) => user.userId === receiverUserId);
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
   return console.log('List: ', users);
};

io.on('connection', (socket) => {
   socket.on('myDetail', (userId) => {
      const myDetail = {
         userId: userId,
         socketId: socket.id,
      };
      addUser(myDetail);
   });

   socket.on('message', (clientMessage) => {
      console.log('message: ', clientMessage);
      console.log('receiver: ', clientMessage.receiver.firebaseId);
      const receiverSocket = getUser(clientMessage.receiver.firebaseId);
      if (!receiverSocket) return console.log('Offline');

      io.to(receiverSocket.socketId).emit('messageToReceiver', {
         sender: clientMessage.sender,
         content: clientMessage.content,
         conversationId: clientMessage.conversationId,
         createdAt: clientMessage.createdAt,
      });
   });

   socket.on('disconnect', () => {
      removeUser(socket.id);
   });
});
