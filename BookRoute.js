let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let bookSchema = require('./Book');


router.route('/').get((req, res, next) => {
  bookSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

router.route('/topissued').get((req, res) => {
  var array=[]
 bookSchema.find().sort({times_issued:-1}).limit(6).exec((error,docs)=>{
   array=docs;
   res.json({
     data:array
   })
 });
//  data.toArray((err,result)=>{
//     if (err) throw err;
//       console.log(result);
//   })
})

router.route('/addbook').post((req, res, next) => {
  console.log(req.body)
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      res.send("Cannot Add the Book")
    } else {
      res.status(200).send(data)
    }
  })
});


router.route('/issue/:id').get((req, res, next) => {
  console.log(req.params.id)
  bookSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
        data.times_issued=data.times_issued+1;
        data.copies=data.copies-1;
        data.save().then((data)=>{res.json(data)});
    }
  })
})


router.route('/addcopies/:id').get((req, res, next) => {
    bookSchema.findById(req.params.id, (error, data) => {
        if (error) {
          res.send(error)
        } else {
            data.copies=data.copies+1;
            data.save().then((data)=>{res.json(data)});
        }
      })
})


router.route('/delete/:id').delete((req, res, next) => {
  bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).send("Deleted successfully")
    }
  })
})


module.exports = router;