// simple function to remove key values from an object based on a condition
function filterUndefined(object, callback) {
  return Object.fromEntries(Object.entries(object).filter(callback));
}

export default class DTO {
  #_id;
  constructor(obj){
      this.#_id = obj._id;
  }
  get _id(){
      return this.#_id;
  }
  toJSON() { // override this
      return {
          _id:this._id
      }
  }
  toFilteredJSON() {
      return filterUndefined(this.toJSON(), (pair) => typeof pair[1] !== "undefined")
  }
}