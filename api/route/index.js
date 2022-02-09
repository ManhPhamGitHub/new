const { getData, addData, updateData, deleteData, deleteOneImg } = require("../controller")
const Router = (app)=>{
    app.get('/',getData)
    app.post('/',addData)
    app.put('/:id',updateData)
    app.delete('/:id',deleteData)
    app.delete('/img/:id',deleteOneImg)
}
module.exports = Router
// 61cbbda0f180e62f50201fbf