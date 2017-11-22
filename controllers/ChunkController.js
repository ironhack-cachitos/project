const User = require('../models/User');
const Chunk = require('../models/Chunk');
const Pile = require('../models/Pile');

module.exports = {
  getNew: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    res.render('chunk/new', {layout: layout});
  },
  postNew: (req, res, next) => {
  //Aqui tendremos que buscar la manera de escapar el código
  //De momento lo pegamos tal cual
  const codeContent = req.body.content;
  //Construimos un array con los tags
  const tagsArr = req.body.tags !== '' ? req.body.tags.replace(/,\s*$/, "").split(',') : '';
  const chunkInfo = {
    creator: req.user._id,
    name: req.body.name,
    description: req.body.description,
    content: codeContent,
    language: req.body.language,
    tags: tagsArr
  };
  const newChunk = new Chunk(chunkInfo);
  newChunk.save()
    .then((chunk) => {
      const chunkId = chunk._id;
      const chunkObj = { chunk: chunk._id, order: 1};
      Pile.findOneAndUpdate({owner: req.user._id}, {
        $push: {'elements': chunkObj }
      }, {new: true} )
        .then((pile) => {
          return res.render('main', {pile});
        })
        .catch(err => next(err));
    })
    .catch((err) => {
      next(err);
    });
  },
  getDetail: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    const chunkId = req.query.id;
    Chunk.findById(chunkId)
      .then(chunk => {
        res.render('chunk/detail', {chunk, layout: layout});
      })
      .catch(err => next(err));
  },
  getEdit: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    const chunkId = req.query.id;
    Chunk.findById(chunkId)
      .then(chunk => {
        return res.render('chunk/edit', {chunk, layout: layout});
      })
      .catch(err => next(err));
  },
  postEdit: (req, res, next) => {
    const chunkId = req.params.id;
    //Aqui tendremos que buscar la manera de escapar el código
    //De momento lo pegamos tal cual
    const codeContent = req.body.content;
    //Construimos un array con los tags
    const tagsArr = req.body.tags !== '' ? req.body.tags.replace(/,\s*$/, "").split(',') : '';
    const chunkInfo = {
      creator: req.user._id,
      name: req.body.name,
      description: req.body.description,
      content: codeContent,
      language: req.body.language,
      tags: tagsArr
    };
    //Tenemos que hacer un check de si el cachito pertenece
    //al usuario (lo actualizamos) o hay que guardalo como nuevo
    Chunk.findById(chunkId, {fields: {"creator": 1}})
      .then((chunk) => {
        if (chunk.creator == req.user._id) {
          Chunk.findByIdAndUpdate(chunkId, {
            $set: chunkInfo
          })
            .then(() => {
              return res.redirect(`/chunk/detail/${chunk.id}`);
            })
            .catch(err => next(err));
        } else {
          const newChunk = new Chunk(chunkInfo);
          newChunk.save()
            .then((chunk) => {
              const chunkId = chunk._id;
              const chunkObj = { chunk: chunk._id, order: 1};
              Pile.findOneAndUpdate({owner: req.user._id}, {
                $push: {'elements': chunkObj }
              }, {new: true} )
                .then((pile) => {
                  return res.render('main', {pile});
                })
                .catch(err => next(err));
            })
            .catch((err) => {
              next(err);
            });
        }
      })
      .catch(err => next(err));
  },
  getDelete: (req, res, next) => {
    let layout = req.query.layout ? req.query.layout : 'layout';
    //Aqui simplemente pintamos una vista de confirmación,
    //pero nos traemos el objeto para pintar el nombre
    // Falta por chequear que el user es el dueño del chunk
    // antes de dejarle borrarlo
    Chunk.findById(req.query.id)
    .then((chunk) => {
      return res.render('chunk/delete-confirmation', {chunk, layout: layout});
    })
    .catch(err => next(err));
  },
  postDelete: (req, res, next) => {
    //Falta por chequear que el user es el dueño del chunk
    // antes de dejarle borrarlo
    Chunk.findByIdAndRemove(req.params.id)
    .then(() => { return res.redirect('/main');})
    .catch(err => next(err));
  },
  postAdd: (req, res, next) => {
    const userId = req.user._id;
    const pileId = req.user.pile;
    const chunkId = req.params.id;
    Pile.findByIdAndUpdate(pileId, {
      $push: {'elements': { 'chunk': chunkId, 'order' : 1 }}
    }, {new: true} )
      .then((pile) => {
        return res.render('main', {pile});
      })
      .catch(err => next(err));
  }
};
