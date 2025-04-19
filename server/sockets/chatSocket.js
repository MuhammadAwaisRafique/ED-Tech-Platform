const Message = require('../models/Message');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinCourse', (courseId) => {
      socket.join(courseId);
    });

    socket.on('sendMessage', async ({ courseId, userId, content }) => {
      try {
        const message = await Message.create({
          courseId,
          sender: userId,
          content
        });
        
        io.to(courseId).emit('newMessage', message);
      } catch (error) {
        console.error('Message error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = chatSocket;