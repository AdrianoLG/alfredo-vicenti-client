export function getTimesRepeated(array) {
  if (array.length === 0) return null;
  var items = {};
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (items[el] == null) items[el] = 1;
    else items[el]++;
  }
  return items;
}

export function sorts(array) {
  let sortable = [];
  for (let item in array) {
    sortable.push([item, array[item]]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable;
}

export function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
    let x = a[field].toString().toLowerCase() || '';
    let y = b[field].toString().toLowerCase() || '';
    if (x > y) {
      return 1;
    }
    if (y > x) {
      return -1;
    }
    return 0;
  });
}

export function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
    if (!a[field] || !b[field]) {
      return 0;
    }
    let x = a[field].toString().toLowerCase() || '';
    let y = b[field].toString().toLowerCase() || '';
    if (x > y) {
      return -1;
    }
    if (y > x) {
      return 1;
    }
    return 0;
  });
}

export function sortDescNum(arr, field) {
  return arr.sort(function (a, b) {
    if (!a[field] || !b[field]) {
      return 0;
    }
    let x = a[field];
    let y = b[field];
    if (x > y) {
      return -1;
    }
    if (y > x) {
      return 1;
    }
    return 0;
  });
}
