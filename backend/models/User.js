const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

// Schema pentru utilizator
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dietary_preferences: { type: [String], default: [] },

});

// // Hash-uirea parolei înainte de salvare
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Nu hash-uim dacă parola nu a fost modificată
//   this.password = await bcrypt.hash(this.password, 10); // Hash-uim parola cu bcrypt
//   next();
// });

// // Metodă pentru compararea parolelor
// UserSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password); // Compară parola introdusă cu cea din DB
// };

module.exports = mongoose.model('User', UserSchema);
  