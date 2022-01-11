async function ApostarVinte(req, res){
    const id = req.userId
    return res.send({id})
}

module.exports = {
    ApostarVinte
}