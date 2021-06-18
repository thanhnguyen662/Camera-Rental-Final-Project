const io = require('socket.io')(8900, {
   cors: {
      origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (userId, socketId) => {
   !users.some((user) => user.id === userId) &&
      users.push({ userId, socketId });
};

const removeUser = (socketId) => {
   users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
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
      const user = getUser(receiverId);
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
