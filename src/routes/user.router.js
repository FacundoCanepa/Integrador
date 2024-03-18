import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
  res.send({ status: "success", message: "usuario registrado" });
});

router.get('/failregister', async (req, res) => {
  console.log('Registro fallido');
  res.status(400).send({ error: "failed" });
});


passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
  try {
      const user = await User.findOne({ email: username });
      if (!user) {
          console.log('Usuario no existe');
          return done(null, false, { message: 'Usuario no encontrado' });
      }
      if (!isValidatePassword(user, password)) {
          console.log('Contraseña incorrecta');
          return done(null, false, { message: 'Contraseña incorrecta' });
      }
      console.log('Inicio de sesión exitoso');
      return done(null, user);
  } catch (error) {
      console.log('Error al intentar iniciar sesión:', error);
      return done(error);
  }
}));

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }));

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.send('You are logged in successfully with Github!')
})

export default router;
