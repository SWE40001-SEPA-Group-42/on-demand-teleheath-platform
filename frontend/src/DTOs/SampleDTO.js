import DTO from './DTO';

class SampleDTO extends DTO {
    #test;

    constructor(obj = {}){
        super(obj);
        this.#test = obj.test;
    }

    get test() {
        return this.#test;
    }
    set test(value){
        this.#test = value;
    }

    toJSON(){
        return {
            _id:this._id,
            test:this.test
        }
    }
}

Window.SampleDTO = SampleDTO; // TODO: Remove this... debug only

export default SampleDTO;