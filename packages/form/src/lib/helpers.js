export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export function camelToDash(str) { return str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`); }

export function camelToSpaced(str) { return str.replace(/([A-Z])/g, val => ` ${val.toLowerCase()}`); }

export function camelToCapitalized(str) {
  str = str.replace(/([A-Z])/g, val => ` ${val[0].toUpperCase()}${val.toLowerCase().slice(1)}`)
  str = str[0].toUpperCase() + str.slice(1)
  return str
}

export function dashToCamel(str) { return str.replace(/(-[a-z])/g, val => val.toUpperCase().replace('-', '')); }

export function switchCaseMode(str) { return (/-/).test(str) ? dashToCamel(str) : camelToDash(str); }