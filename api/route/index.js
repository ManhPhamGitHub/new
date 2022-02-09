const { getData, addData, updateData, deleteData, deleteOneImg } = require("../controller")
const passport = require('passport')
const Router = (app)=>{
    app.get('/',getData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImg)


    app.get('/auth/google',passport.authenticate('facebook',{scope:'email'}));
    app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
}
module.exports = Router
// 61cbbda0f180e62f50201fbf