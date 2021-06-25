const io = require('socket.io')(8900, {
   cors: {
      origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (userId, socketId) => {
   !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });

   console.log('USER IN ARRAY: ', users);
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
   console.log('USER IN ARRAY getUser: ', users);
   console.log('userId in getUser: ', userId);
   return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
   //CONNECT
   console.log('a user is connected');

   //take userId & socketId from user
   socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      io.emit('getUsers', users);
   });

   //send and get messages
   socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      console.log('USER IN ARRAY sendMessage: ', users);
      const user = getUser(receiverId);
      if (!user) return console.log('User is offline');

      console.log('senderId in sendMessage: ', senderId);
      console.log('text in sendMessage: ', text);
      io.to(user.socketId).emit('getMessage', {
         senderId,
         text,
      });
   });

   //DISCONNECT
   socket.on('disconnect', () => {
      console.log('user is disconnected');
      removeUser(socket.id);
      io.emit('getUsers', users);
   });
});
