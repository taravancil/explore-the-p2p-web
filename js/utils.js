export function $ (querySelector) {
  var els = document.querySelectorAll(querySelector)

  return els.length > 1 ? els : els[0]
}