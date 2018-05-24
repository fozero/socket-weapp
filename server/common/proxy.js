/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
import fetch from 'node-fetch'
export default (...args) => {
    return fetch.apply(null, args).then(res =>{
        let data = res.text();
        return data;
    }) .catch(err =>{
        console.log('proxy err'+err)
        return err;
    })
}