var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var morgan = require('morgan');
app.use(morgan('combined'));
var crypto = require('crypto');

var http = require('http').Server(app);


var path = require('path');
var Pool = require('pg').Pool;




//DATABASE CONFIGURATION
var config = {
  host: 'db.imad.hasura-app.io',
  user: 'itsinayats',
  password: process.env.DB_PASSWORD,
  database: 'itsinayats',
  port:'5432'
};

//INDEX PAGE
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//CONNECTION CREATION
var pool=new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('select * from articles',function(err,result){
        if(err)
        {
          res.status(500).send(err.toString()) ;
        }
        else
        {
          res.send(JSON.stringify(result.rows));  
        }
    });
 
});










//load blog
app.get('/blog', function (req, res) {
res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

//BOOTSTRAP FILES INCLUDES
app.get('/ui/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'bootstrap.min.css'));  //bootstrap  to test
});

app.get('/ui/css/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'bootstrap.css'));  //bootstrap
});

app.get('/ui/js/bootstrap.min.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'bootstrap.min.js'));  //bootstrap
});
//main.js
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
//article.js
app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});
//favicon
app.get('/fevicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});
//style
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


//images
app.get('/ui/images/spinner.gif', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'spinner.gif'));
});

app.get('/ui/images/inayat.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'inayat.jpg'));
});

app.get('/ui/images/saviours.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'saviours.png'));
});
app.get('/ui/images/server.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'server.png'));
});
app.get('/ui/images/phone.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'phone.png'));
});
app.get('/ui/images/mail.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'mail.png'));
});
app.get('/ui/images/iitm.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'iitm.png'));
});
app.get('/ui/images/web.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'web.png'));
});
app.get('/ui/images/java.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'java.png'));
});
app.get('/ui/images/setting.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'setting.png'));
});
app.get('/ui/images/school.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'school.png'));
});
app.get('/ui/images/college.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'college.png'));
});
app.get('/ui/images/fb.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'fb.PNG'));
});
app.get('/ui/images/gp.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'gp.PNG'));
});
app.get('/ui/images/lkn.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'lkn.PNG'));
});
app.get('/ui/images/twitter.PNG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/images', 'twitter.PNG'));
});

app.get('/ui/images/a.gif',function(req,res){
res.sendFile(path.join(__dirname, 'ui/images' , 'a.gif'));
});
app.get('/ui/images/fb.jpg',function(req,res){
res.sendFile(path.join(__dirname, 'ui/images' , 'fb.jpg'));
});
app.get('/ui/images/gl.jpg',function(req,res){
res.sendFile(path.join(__dirname, 'ui/images' , 'gl.jpg'));
});


//getting categories
app.get('/get-categories', function (req, res) {
   pool.query('select * from category', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});



//getting articles
app.post('/getArticles',function(req,res){
    var cat=req.body.category;
    pool.query("select * from articles where category=$1",[cat],function(err,result){
         if(err){
          res.status(500).send(err.toString()) ;
          }
     else{
            if(result.rows.length===0)
             {
                res.status(400).send('ARTICLE NOT FOUND');
             }
                 else{
                   res.send(JSON.stringify(result.rows));
                     
                 }
             }
        
    });
    
});




//getting Tags
app.post('/getTags',function(req,res){
    var id=req.body.id;
    pool.query("select *from article_tags where article_id=$1",[id],function(err,result){
         if(err){
          res.status(500).send(err.toString()) ;
          }
     else{
            if(result.rows.length===0)
             {
                res.status(400).send('ARTICLE NOT FOUND');
             }
                 else{
                   res.send(JSON.stringify(result.rows));
                     }
             }
        
    });
    
});




//get author
app.post('/getAuthor',function(req,res){
    var ai=req.body.author_id;
    pool.query("select * from users where id=$1",[ai],function(err,result){
         if(err){
          res.status(500).send(err.toString()) ;
          }
     else{
            if(result.rows.length===0)
             {
                res.status(400).send('ARTICLE NOT FOUND');
             }
                 else{
                   res.send(JSON.stringify(result.rows));
                     }
             }
        
    });
    
});












//fetching recent article on blog home page
app.get('/get-blog-data',function(req,res){
    pool.query("select article_tags.tag, articles.title,articles.content,articles.category,articles.heading, articles.time,users.name FROM articles,article_tags,users where articles.author_id=users.id AND articles.id=article_tags.article_id AND articles.id=(select MAX(id) from articles) order by time DESC",function(err,result){
         if(err){
          res.status(500).send(err.toString()) ;
          }
     else{
            if(result.rows.length===0)
             {
                res.status(400).send('ARTICLE NOT FOUND');
             }
                 else{
                   res.send(JSON.stringify(result.rows));
                     
                 }
             }
        
    });
    
});


function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});




app.post('/create-user', function (req, res) {
  
  
   var name = req.body.name;
   var email= req.body.email;
   var password = req.body.password;
    if((name== '')||(password== '')||(email== '')){
          res.status(500).send('name/email/password cannot be bank!!!!');
        }
        else{
 
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO users(name,email,password) VALUES ($1, $2, $3)', [name,email, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(name+'!!!You have successfully registered!!');
      }
       
   });
        } 
        
});




app.post('/login', function (req, res) {
   var email = req.body.email;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "users" WHERE email = $1', [email], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                req.session.auth = {email: result.rows[0].email};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});










var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
 console.log(`IMAD course app listening on port ${port}!`);
});
