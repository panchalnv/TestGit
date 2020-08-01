/* eslint-disable no-param-reassign */
class Utility {
  groupArrayOfObjects(list, key) {
    return list.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}

const instance = new Utility();
Object.freeze(instance);

export default instance;
