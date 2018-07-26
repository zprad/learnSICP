import {pair, head, tail, set_head, set_tail} from './pair'
import {list, is_empty_list} from './sequences'


function make_table() {
  return list('*table*')
}

function lookup(key, table) {
  var record = assoc(key, tail(table))
  if (record === undefined) {
    return undefined
  } else {
    return tail(record)
  }
}

function assoc(key, records) {
  if (is_empty_list(records)) {
    return undefined
  }
  
  if (key === head(head(records))) {
    return head(records)
  } else {
    return assoc(key, tail(records))
  }
}

function insert(key, value, table) {
  var record = assoc(key, tail(table))
  if (record === undefined) {
    var new_pair = pair(key, value)
    var new_records = pair(new_pair, tail(table))
    set_tail(table, new_records)
  } else {
    set_tail(record, value)
  }
}

function lookup_two_dimen(key1, key2, table) {
  var subtable = assoc(key1, tail(table))
  if (subtable !== undefined) {
    var record = assoc(key2, tail(subtable))
    if (record === undefined) {
      return undefined
    } else {
      return tail(record)
    }
  } else {
    return undefined
  }
}

function insert_two_dimen(key1, key2, value, table) {
  var subtable = assoc(key1, tail(table))
  if (subtable !== undefined) {
    var record = assoc(key2, tail(subtable))
    if (record !== undefined) {
      set_tail(record, value)
    } else {
      var new_pair = pair(key2, value)
      var new_records = pair(new_pair, tail(subtable))
      set_tail(subtable, new_records)
    }
  } else {
    var new_pair = pair(key2, value)
    var new_subtable = list(key1, new_pair)
    var new_records = pair(new_subtable, tail(table))
    set_tail(table, new_records)
  }
}

export default {
  make_table, insert, lookup,
}

