const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected Successfully');
    } catch (err) {
      console.error('MongoDB Connection Error:', err);
      // Exit process with failure
      process.exit(1);
    }
  };
  
  module.exports = connectDB;