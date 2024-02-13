import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
  country: String,
  data: Array,
  color: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
