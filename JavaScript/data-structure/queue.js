import {pair, head, tail, set_head, set_tail} from './pair'
import {is_empty_list, empty_list} from './sequences'

function make_queue() {
  return pair(empty_list, empty_list)
}

function front_ptr(queue) {
  return head(queue)
}

function rear_ptr(queue) {
  return tail(queue)
}

function set_front_ptr(queue, item) {
  set_head(queue, item)
}

function set_rear_ptr(queue, item) {
  set_tail(queue, item)
}

function is_empty_queue(queue) {
  return is_empty_list(front_ptr(queue))
}

function front_queue(queue) {
  if (is_empty_queue(queue)) {
    console.error("front_queue called with an empty queue")
  } else {
    return front_ptr(queue)
  }
}

function insert_queue(queue, item) {
  let new_pair = pair(item, empty_list)
  if (is_empty_queue(queue)) {
    set_front_ptr(queue, new_pair)
    set_rear_ptr(queue, new_pair)
  } else {
    set_tail(rear_ptr(queue), new_pair)
    set_rear_ptr(queue, new_pair)
  }
  return queue
}

function delete_queue(queue) {
  if (is_empty_list(queue)) {
    console.error("delete_queue called with an empty queue")
  } else {
    set_front_ptr(queue, tail(front_queue(queue)))
    return queue
  }
}

export default {
  make_queue, empty_queue, front_queue, insert_queue, delete_queue,
}