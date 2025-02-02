const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const SampleModel = mongoose.model('Sample', SampleSchema);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/vsDatabase');
        console.log('MongoDB connected');
         // Insert sample data
         const sample = new SampleModel({
            name: 'John Doe',
            age: 30,
            email: 'john.doe@example.com',
        });

        await sample.save();
    } catch (err) {
        console.log("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
