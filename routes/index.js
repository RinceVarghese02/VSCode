var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var filefolder=[];
  fs.readdir('./uploads',{withFileTypes:true},function(err,files){
    // console.log(files)
    if(err){
      console.log(err)
    }else{console.log('saved')
    files.forEach(file => {
      filefolder.push({filefoldername:file.name,isfile:file.isFile()})
    });
    // console.log(filefold er)
    // console.log(JSON.stringify(filefolder, null, 2));

    res.render('index',{filefolder:filefolder,fileopen:false});
  }
  })

});

router.post('/filedata',function(req,res,next){
  var filename=req.body.filename;
  fs.writeFile(`./uploads/${filename}`,'', function(err){
    if(err){
      console.log(err)
    }console.log('file created')
  })
  // console.log(filename)
  res.redirect('/')
})
router.post('/folderdata',function(req,res,next){
  var foldername=req.body.foldername;
  fs.mkdir(`./uploads/${foldername}`,function(err){
    if(err){
      console.log(err)
    }console.log('folder created')
  })
  // console.log(foldername)
  res.redirect('/')
})

router.get('/delete/:filefoldername/:isfile',function(req,res){
  var filefoldername=req.params.filefoldername;
  const isfile=req.params.isfile;
  console.log(isfile)
  if(isfile=="true"){

    fs.unlink(`./uploads/${filefoldername}`,function(err){
      if(err){
        console.log(err)
      }else{
        console.log('File deleted')
      }
      res.redirect('/')
    })
  }
  else{
    fs.rmdir(`./uploads/${filefoldername}`,function(err){
      if(err){
        console.log(err)
      }else{
        console.log('Folder deleted')
      }
      res.redirect('/')
    })
  }
  // console.log(filefoldername)
})

router.get('/openfile/:filename',function(req,res){
  var filename=req.params.filename;
  // console.log(filename)
  var filefolder=[];
  fs.readdir('./uploads',{withFileTypes:true},function(err,files){
    // console.log(files)
    if(err){
      console.log(err)
    }else{console.log('saved')
    files.forEach(file => {
      filefolder.push({filefoldername:file.name,isfile:file.isFile()})
    });
    // console.log(filefolder)
    // console.log(JSON.stringify(filefolder, null, 2));
    fs.readFile(`./uploads/${filename}`,'utf-8',function(err,data){
      // console.log(data)
      res.render('index',{filefolder:filefolder,fileopen:true,filename:filename,data:data});
    })

  }
  })

})

router.post('/savefile/:filename',function(req,res){
  var filename=req.params.filename;
  var data=req.body.data;
  // console.log(filename,data)
  fs.writeFile(`./uploads/${filename}`,data,function(err){
    if(err){
      console.log(err)
    }else{
      console.log('saved')
    }
    res.redirect(`/openfile/${filename}`)
  })
})

module.exports = router;
