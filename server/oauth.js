import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import Userdb from "./model/userschema.js";

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email", "openid"],
    },

    async (accessToken, refreshToken, profile, done) => {
      
      try {
        let user = await Userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new Userdb({
            oauth: {
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
            },
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
