function getArrIdsUser (data) {

    let arrIdsUser = data.map(element => {
        return element.dataValues.idGroup
    })
    return arrIdsUser
}




module.exports = {
    getArrIdsUser
}