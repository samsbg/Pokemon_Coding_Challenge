export function sortData(data, sort) {
  switch (sort) {
    case "name":
      data.sort((a, b) => (a.name).localeCompare(b.name));
      break;
    case "-name":
      data.sort((a, b) => (b.name).localeCompare(a.name));
      break;
    default:
  }
  
  return data;
}

export function filterData(data, filter) {
  return data.filter(str => str.name.includes(filter));
}
