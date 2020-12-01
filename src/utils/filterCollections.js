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
