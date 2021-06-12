const { get } = require("../route/colorRoute")
const stringSimilarity = require("string-similarity");

exports.getColorName = async(req,res)=>{
    try{
        if(req.query.name){
            const queryStr = req.query.name.toUpperCase()
            const queryPro = req.con.promise()
            const [rows,fields] = await queryPro.query("select * from tblColor")
            let colorName =  rows.map(obj => {
                let strName = obj.colorName.toUpperCase()
                return strName
            })
            let matchedColor = stringSimilarity.findBestMatch(`${queryStr}`, colorName);
            let result = matchedColor.bestMatch.rating < 0.3 ? null : matchedColor.bestMatch.target
            const [Colors,fiedls] = await queryPro.query(`select * from tblColor where colorName like '${result}'`)
            //const a =`select * from tblColor where colorName like "${result}"`
            res.status(200).json({
                message: "Success",
                Colors
            })
        }
    }catch(err){
        res.status(401).json({
            message: "Failed",
            err: err.message
        })
    }
    
}