const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/notfound-error');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', cardRoutes);

router.use((req, res, next) => next(new NotFoundError('Запрашиваемые данные не найдены')));

module.exports = router;
