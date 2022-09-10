//#region Base Request
class Request {
  constructor(path, options = {}) {
      this.options = options;
      this.path = path;
  }

  get url() {
      return new URL(`${this.path.join("/")}`, "http://localhost:8001"); // ensure it is the database url
  }

  execute() {
      // use promise to be able to call resolve and reject conditionally
      return new Promise((resolve, reject) => {
          try {
              fetch(this.url.toString(), this.options).then((data) => {
                  if (data.ok) {
                      resolve(data);
                  } else {
                      reject(data);
                  }
              }).catch(e => {
                  reject(e);
              });
          } catch (e) {
              reject(e);
          }
      });
  }
}
//#endregion

//#region Type Requests
class GetRequest extends Request {
  constructor(path) {
      super(path, {
          method: "GET"
      });
  }
}

class PostRequest extends Request {
  constructor(path, data) {
      super(path, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      });
  }
}
class PutRequest extends Request {
  constructor(path, data) {
      super(path, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
  }
}
class DeleteRequest extends Request {
  constructor(path) {
      super(path, {
          method: "DELETE"
      });
  }
}

//#endregion

//#region CRUD Requests
export class Select extends GetRequest {
  constructor(table) {
      super([table]);
  }
}

export class SelectId extends GetRequest {
  constructor(table, id) {
      super([table, id]);
  }
}

export class Update extends PutRequest {
  constructor(table, obj) {
      super([table, obj._id], obj);
  }
}

export class Insert extends PostRequest {
  constructor(table, obj) {
      super([table], obj);
  }
}

export class Delete extends DeleteRequest {
  constructor(table, id) {
      super([table, id]);
  }
}
//#endregion