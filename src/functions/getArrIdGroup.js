function getArrIdsGroup (data) {

    let arrIdsGroups = data.map(element => {
        return element.dataValues.idGroup
    })
    return arrIdsGroups
}




module.exports = {
    getArrIdsGroup
}