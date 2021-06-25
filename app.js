const express = require("express");
const passport = require("passport");
const NaverStrategy =
  require("./node_modules/passport-naver-v2/build/passport-naver.js").Strategy;
const app = express();
const port = 3000;

passport.use(
  new NaverStrategy(
    {
      clientID: "X7MpkilkDjWn3YIud_K9",
      clientSecret: "RUmO7MaIMd",
      callbackURL: `http://ec2-3-35-205-27.ap-northeast-2.compute.amazonaws.com:3000/api/naver/login/callback`, // 애플리케이션을 등록할 때 입력했던 callbackURL 을 입력해준다.
    },
    (accessToken, refreshToken, profile, done) => {
      // 이곳에서 사용자 계정 관련된 작업을 한다.
      console.log(profile);
      done(null, profile._json);
    }
  )
);

app.use(passport.initialize());

app.get(
  "/api/naver/login",
  passport.authenticate("naver", { authType: "sampleState" })
);

app.get(
  "/api/naver/login/callback",
  passport.authenticate("naver"),
  (req, res) => {
    res.send(
      "result :" + JSON.stringify({ state: req.query.state, user: req.user })
    );
  }
);

app.listen(port, () => {
  console.log(`${port}에서 서버 동작중입니다.`);
});
