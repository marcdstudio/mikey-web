export default function dateOrder(date) {

  if (!date) return null

  return `
      ${date?.split('-')[1]}.${date?.split('-')[2]}.${date
    ?.split('-')[0]
    .replace('20', '')}`
}
