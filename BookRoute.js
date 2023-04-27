let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let multer = require('multer');
let bookSchema = require('./Book');
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require('fs');

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Please upload a valid file type"));
    }
    cb(undefined, true);
  },
});


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

router.post('/addbook',(req, res, next) => {
  console.log(req.body);
  // req.body.file=req.file.buffer;
  // alert("req.file.buffer")
  bookSchema.create(req.body, (error, data) => {
    if (error) {
      res.send("Cannot Add the Book")
    } else {
      res.status(200).send(data)
    }
  })
});
router.post('/addbook/attachment/:id',upload.single("file"),async(req, res) => {
  const submission = await bookSchema.findById(req.params.id);

  submission.file = req.file.buffer;
 
  console.log("here i reached");
  await  submission.save();
    res.send();

}, ( error,req, res, next) => {
  res.status(400).send({ error: error.message });
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
router.get("/download/:id", async (req, res) => {
 
  try {
    // console.log("This is it")
    const book = await bookSchema.findById(req.params.id);
    if (!book || !book.file) {
      throw new Error();
    }
    res.set("Content-Type", "application/pdf");
    console.log("book");
    res.send(book.file);
  } catch (e) {
    res.status(404).send();
  }
});


module.exports = router;