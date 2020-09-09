import  * as _ from "lodash";
export const where = async (condition:{[key:string]:string|number}):Promise<string> =>{
    if (_.isEmpty(condition)) {
        return ""
    }
    let sql = 'where';
    let data =Object.entries(condition);
    for (let index in data){
        const [key ,value] = data[index];
        if (_.isUndefined(value) || _.isNull(value)) {
            continue;
        }
        sql +=` ${key} = ${value} and`
    }
    return sql == 'where'?"":sql.replace(new RegExp('and$'),'',)
};
