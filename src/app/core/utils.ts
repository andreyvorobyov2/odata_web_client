
export class Utils{

  static empty_uuid:string = '00000000-0000-0000-0000-000000000000'

  static valueIsFilled(value:any){
    if(value === ''
      || value === undefined
      || value === null
      || value === Utils.empty_uuid){
        return false
      }else{
        return true
      }
  }

  static getProperty(obj:any, prop:string, default_value:any){
    if(obj.hasOwnProperty(prop)){
      return obj[prop]
    }
    return default_value
  }

  static propertyIsFilled(obj:any, prop:string){
    return Utils.valueIsFilled(Utils.getProperty(obj, prop, undefined))
  }

  static makeid(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static removeCircularReferences(source_obj:any, show_meta:boolean = false){
    if(source_obj === undefined){
      return {}
    }

    let seen:any = [];
    let obj = JSON.stringify(source_obj, function(key, val) {
      if (val != null && typeof val == "object") {
        if(key === 'meta' && !show_meta){ // dont show meta object
          return
        }
        if (seen.indexOf(val) >= 0) {
            return;
        }
        seen.push(val);
      }
      return val;
    });

    return JSON.parse(obj)
  }

  static put_data(obj:any, prop:string, value:any){
    if(obj === undefined){
      console.log('put_data: obj is undefined [' + prop + ']')
      return
    }
    let _index = prop.indexOf('.')
    if(_index > -1){
      this.put_data(obj[prop.substring(0, _index)], prop.substring(_index + 1), value)
    }
    obj[prop] = value
  }

  static arr_add_unique(arr:any, value:any){
    if(arr.indexOf(value) === -1)
      arr.push(value)
  }

  static map_get_by_value(map:any, value:any) {
    for (let [k, v] of map.entries()) {
      if (v === value)
        return k;
    }
    return undefined
  }

}
