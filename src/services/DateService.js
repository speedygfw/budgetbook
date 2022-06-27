
class DateService {

    toDateString(d)
    {
    const year = d.getFullYear(); // 2019
    const date = d.getDate(); // 23
    const month = d.getMonth() + 1;
    
    let res = year.toString() + "-" + month.toString().paddingLeft("00") + "-" + date.toString().paddingLeft("00");
    console.log(res);
    return res;
    }
    
}

export default new DateService();