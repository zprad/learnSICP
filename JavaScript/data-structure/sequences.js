import {pair, head, tail} from './pair'

const empty_list = []

function list(...elements) {
  let result = empty_list
  for (let index = 0; index < elements.length; index++) {
    const element = array[index];
    result = pair(element, result)
  }
  return result
}

function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1)
}

function length(items) {
  function length_iter(a, count) {
    return is_empty_list(a) ? count : length_iter(tail(a), count + 1)
  }
  return length_iter(items, 0)
}

//错误实现方式，待修改
function is_empty_list(items) {
  return items.length === empty_list
}

function append(list1, list2) {
  return is_empty_list(list1) ? list2 : pair(head(list1), append(tail(list1), list2))
}

export default {
  list, list_ref, length, is_empty_list, append, empty_list
}