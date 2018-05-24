/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
'use strict';
/**
 * 把另一个对象的属性安装到指定的对象中
 * @param  {Object} to   指定的对象
 * @param  {Object} from 被安装的对象
 * @return {Object} to   安装完成的对象
 */
import config from './config'
export function extend (to, from) {
    const keys = Object.keys(from)
    let i = keys.length
    while (i--) {
        to[keys[i]] = from[keys[i]]
    }
    return to
}
/**
 * @param  {Object} default  默认的对象，包括错误信息与状态码
 * @param  {Object} extra    附加的说明与参数
 */
export class KoaErr extends Error {
    constructor ({ message = 'Error', status = 500 } = {}, ...args) {
        super()
        this.message = message
        this.status = status
        if (args.length > 0) {
            extend(this, args[0])
        }
    }
}

//进行sha1加密
import crypto from 'crypto';
export function sha1(str,num) {
    let shasum = crypto.createHash("sha1");
    shasum.update(str,'utf8');
    if(num === 1){
        str = shasum.digest("hex").toUpperCase();
    }else {
        str = shasum.digest("hex");
    }
    return str;
}
//md5
export function md5(str,num){
    let shasum = crypto.createHash("md5");
    shasum.update(str,'utf8');
    if(num === 1){
        str = shasum.digest("hex").toUpperCase();
    }else {
        str = shasum.digest("hex");
    }
    return str;
}
//SHA1WithRSA  RSA-SHA1
export function RSA_SHA1(str,num){
    try{
        let key = config.zxWx.privatekey;
        console.log('RSA_SHA1 key : '+ key);
        let shasum = crypto.createSign('RSA-SHA1');
        shasum.update(str);
        if(num === 1){
            shasum = shasum.sign(key,'base64').toUpperCase();
        }else {
            shasum = shasum.sign(key,'base64');
        }
        console.log('RSA_SHA1 : '+shasum);
        return shasum;
    }catch (e){
        console.log(e);
    }
}

export function encryptSign(obj){
    let str = JSON.stringify(obj);
    let tmp = str+'secretKey='+config.key.secretKey;
    console.log(tmp);
    return md5(tmp,1)
}

//noncestr
export function getNonceStr () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//timestamp
export function getTimestamp() {
    return new Date().valueOf();
}


//计算日期相差天数
export function getDays(start,end){
    var start = start.getTime();
    var end = end.getTime();
    return (end - start)/(24* 60 * 60 * 1000);
}

/**
 * 获取用于显示的星期和日期时间
 * @param date
 * @returns {string}
 */
export function getPtWeek(date){
    //将字符串日期转换日期对象
    date = date.replace(/-/g, '/');
    let dd = new Date(date);
    let curDate = new Date();
    let curDate2 = new Date();
    let m = dd.getMonth()+1<10?"0"+(dd.getMonth()+1):dd.getMonth()+1;
    let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
    let weekday=["周日","周一","周二","周三","周四","周五","周六"];
    let mynum=dd.getDay();

    let week,weekdate;
    let curMd = curDate.getMonth()+1+"-"+curDate.getDate();
    let md = dd.getMonth()+1+"-"+dd.getDate();
    //昨天
    curDate2.setDate(curDate2.getDate()-1);
    let curMd2 = curDate2.getMonth()+1+"-"+curDate2.getDate();
    //时间
    let hour = dd.getHours()<10?"0"+dd.getHours():dd.getHours();
    let minutes = dd.getMinutes()<10?"0"+dd.getMinutes():dd.getMinutes();
    if(curMd == md){
        week = "今天";
        weekdate = hour+":"+minutes;
    }else if(curMd2 == md){
        week = "昨天";
        weekdate = hour+":"+minutes;
    }else{
        week = weekday[mynum];
        weekdate =  m+"-"+d;
    }
    return week+"|"+weekdate;
}

//显示日期字符串
export function getDateStr(date){
    //将字符串日期转换日期对象
    date = date.replace(/-/g, '/');
    let dd = new Date(date);
    let curDate = new Date();
    let curDate2 = new Date();
    let m = dd.getMonth()+1<10?"0"+(dd.getMonth()+1):dd.getMonth()+1;
    let d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();

    let week,weekdate;
    let curMd = curDate.getMonth()+1+"-"+curDate.getDate();
    let md = dd.getMonth()+1+"-"+dd.getDate();
    //昨天
    curDate2.setDate(curDate2.getDate()-1);
    let curMd2 = curDate2.getMonth()+1+"-"+curDate2.getDate();
    if(curMd == md){
        week = "今天";
    }else if(curMd2 == md){
        week = "昨天";
    }else{
        week =  m+"-"+d;
    }
    return week;
}


/*
 * 日期格式化
 * date  Sep 14, 2017 9:44:30 PM
 * result 2015-03-19 12:00
 */
export function dateFormat(date) {
    var date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
}
/*
* 获取第二天零点时间戳
* */
export function getZeroTimeStamp() {
    var date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    var zero = Math.round(date.getTime());
    console.log('失效时间 ： '+zero);
    return zero;
}



