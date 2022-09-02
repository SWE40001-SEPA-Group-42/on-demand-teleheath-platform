import * as CRUD from './CRUD';

export default class DAO {
    //! DTO: the return type 
    //! table: the mongoose table (check backend/routers/query.js for available tables)
    constructor(table, DTO) {
        this.DTO = DTO;
        this.table = table;
    }

    //#region CRUD OPERATIONS

    insert(obj) {
        if (!(obj instanceof this.DTO)) throw new Error(`Inserted object must be of type ${this.DTO.name}`);
        return new CRUD.Insert(this.table, obj.toFilteredJSON()).execute()
            .then((response) => {
                //extract json from select response
                return response.json()
            }).then((resultSet) => {
                // map json response into DTO
                return new this.DTO(resultSet);
            }).catch((response) => {
                return null;
            })
    }

    select() {
        return new CRUD.Select(this.table).execute()
            .then((response) => {
                //extract json from select response
                return response.json();
            }).then((resultSet) => {
                // map json response into DTO
                return resultSet.map(obj => new this.DTO(obj));
            }).catch((response) => {
                return [];
            })
    }

    selectId(id) {
        return new CRUD.SelectId(this.table, id).execute()
            .then((response) => {
                //extract json from select response
                return response.json();
            }).then((resultSet) => {
                // map json response into DTO
                return new this.DTO(resultSet);
            }).catch((response) => {
                return null;
            })
    }

    update(obj) {
        if (!(obj instanceof this.DTO)) throw new Error(`Updated object must be of type ${this.DTO.name}`);
        return new CRUD.Update(this.table, obj.toFilteredJSON()).execute()
            .then((response) => {
                //extract json from select response
                return response.json();
            }).then((resultSet) => {
                // map json response into DTO
                return new this.DTO(resultSet);
            }).catch((response) => {
                return null;
            });
    }

    delete(id) {
        return new CRUD.Delete(this.table, id).execute()
            .then((response) => {
                return response.json();
            })
            .catch((response) => {
                return false;
            })
    }

    //#endregion
}