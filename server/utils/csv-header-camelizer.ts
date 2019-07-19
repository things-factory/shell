import csv from 'csvtojson'
import _ from 'lodash'

export async function csvHeaderCamelizer(path: string) {
  return await csv()
    .preFileLine((line, index) => {
      if (index === 0) {
        return line
          .split(',')
          .map(header => _.camelCase(header))
          .join()
      } else {
        return line
      }
    })
    .fromFile(path)
}
