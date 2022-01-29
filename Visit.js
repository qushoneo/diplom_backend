import mongoose from 'mongoose';

const Visit = new mongoose.Schema({
    employeeName: { type: String, required: true },
    employeeLastname: { type: String, required: true },
});

export default mongoose.model('Visit', Visit)