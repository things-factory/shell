/**
 * Flatten multi-depth object into single-depth object with delimiter.
 * @param {Object} obj - Multi-depth object to flatten.
 * @param {string} [delimiter = '|'] - Delimiter to join parent and child object.
 * @return {Object} Flatten single-depth object.
 */

export function flattenObject(obj, delimiter = '|') {
  var objResult = {}
  for (var items in obj) {
    if (!obj.hasOwnProperty(items)) continue

    if (!!obj[items] && typeof obj[items] == 'object') {
      var flatObject = flattenObject(obj[items], delimiter)
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        objResult[items + delimiter + x] = flatObject[x]
      }
    } else {
      objResult[items] = obj[items]
    }
  }
  return objResult
}
