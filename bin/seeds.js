const User = require('../models/User');
const Chunk = require('../models/Chunk');
const Pile = require('../models/Pile');
const bcrypt = require('bcrypt');
// Asi randomizamos el salt cada vez que llamemos a este fichero
const bcryptSalt = Math.floor(Math.random() * 16);

const mongoose = require('mongoose');
const db_url = 'mongodb://localhost/ih-cachitos';
mongoose.connect(db_url, {useMongoClient: true})
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

const password = 'ironhack';
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(password, salt);

const user = new User({
  username: 'Paco',
  email: 'paco@gmail.com',
  password: hashPass
});

const chunk1 = new Chunk({
  creator: user._id,
  name: '.eslint file template',
  description: 'config del linter js de atom',
  content: '{\n  \"parserOptions\": {\n    \"ecmaVersion\": 6,\n      \"sourceType\": \"module\",\n    },\n    \"rules\": {\n        \"semi\": 2\n    }\n}',
  language: 'JSON',
  likes: [],
  tags: ['JSON', 'linter', 'atom']
});

const chunk2 = new Chunk({
  creator: user._id,
  name: 'Randomizer',
  description: 'javascript randomizer',
  content: 'Math.floor(Math.random() * array.length',
  language: 'javascript',
  likes: [],
  tags: ['JS', 'javascript', 'random', 'math']
});

const chunk3 = new Chunk({
  creator: user._id,
  name: 'GIT: remove directory',
  description: 'Remove and untrack directory from repository',
  content: 'git rm --cached -r mydirectory',
  language: 'Shell',
  likes: [],
  tags: ['git', 'remove', 'repository']
});

const chunk4 = new Chunk({
  creator: user._id,
  name: 'Maximum Common Divisor',
  description: 'Calculate MCD in javascript',
  content: 'const gcd = (a, b) => {\n    return !b ? a : gcd(b, a % b);\n}',
  language: 'javascript',
  likes: [],
  tags: ['JS','javascript','math']
});

const pileData = new Pile ({
  owner: user._id,
  elements: [
    { chunk: chunk1._id, order: 1 },
    { chunk: chunk2._id, order: 2 },
    { chunk: chunk3._id, order: 3 },
    { chunk: chunk4._id, order: 4 }
  ]
});

User.create(user)
  .then(user => {
    console.log('Usuario creado. Creando chunks');
    return Chunk.create(chunk1, chunk2, chunk3, chunk4);
  })
  .then(chunks => {
    console.log('Chunks creados. Creando pile');
    return Pile.create(pileData);
  })
  .then(pile => {
    console.log('Pile creado. Asociando al usuario');
    return User.findByIdAndUpdate(pile.owner, { $set: { pile: pile._id }});
  })
  .then(() => {
    console.log('All tasks finished');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
