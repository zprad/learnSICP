function get_new_pair() {
  return []
}

function pair(x, y) {
  var fresh = get_new_pair()
  set_head(fresh, x)
  set_tail(fresh, y)
  return fresh
}

function head(pair_object) {
  return pair_object[0]
}

function tail(pair_object) {
  return pair_object[1]
}

function set_head(pair_object, new_head) {
  pair_object[0] = new_head
}

function set_tail(pair_object, new_tail) {
  pair_object[1] = new_tail
}

export default {
  pair, head, tail, set_head, set_tail,
}

