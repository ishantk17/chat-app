// const express=require('express');
// const app=express();
// const connectDB=require('./config/db');
// require('./models/User');
// connectDB();

// app.use('/',require('./routes/auth'));
// app.use('/',require('./routes/Dashboard'));

// app.listen('5000',()=>{
//     console.log("Server running on port 5000");
// });
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connectDB=require('./config/db');
const { default: mongoose } = require('mongoose');
connectDB();
require('./models/User');
const users = mongoose.model('userModel'); // This should be replaced with your user data source

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    let user = users.find({email});
    if (user == null) {
      // User doesn't exist, create a new user
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = { id: Date.now().toString(), email, password: hashedPassword };
        users.create(user);
      } catch(error) {
        return done(null, false, { message: 'Failed to create a new user' });
      }
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  }
));

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.post('/login', passport.authenticate('local', { failureMessage: 'Invalid credentials' }), (req, res) => {
  res.json({ user: req.user });
});

app.listen(5000,()=>{
    console.log("server running on port 5000");
});


