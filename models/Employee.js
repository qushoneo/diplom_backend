import mongoose from 'mongoose';

const Employee = new mongoose.Schema({
    name: { type: String, required: true, },
    lastname: { type: String, required: true },
});

export default mongoose.model('Employee', Employee)