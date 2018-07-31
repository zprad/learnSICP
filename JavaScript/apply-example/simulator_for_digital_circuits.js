import {pair, head, tail, set_head, set_tail} from '../data-structure/pair'
import {list, append} from '../data-structure/sequences'

function half_adder(a, b, s, c) {
  var d = make_wire()
  var e = make_wire()
  or_gate(a, b, d)
  and_gate(a, b, c)
  inverter(c, e)
  and_gate(d, e, s)
  return 'OK'
}

function full_adder(a, b, c_in, sum, c_out) {
  var s = make_wire()
  var c1 = make_wire()
  var c2 = make_wire()
  half_adder(b, c_in, s, c1)
  half_adder(a, s, sum, c2)
  or_gate(c1, c2, c_out)
  return 'OK'
}

function inverter(input, output) {
  function invert_input() {
    var new_value = logical_not(get_signal(input))
    after_delay(inverter_delay, function() {
      set_signal(output, new_value)
    })
  }
  add_action(input, invert_input)
  return 'OK'
}

function logical_not(s) {
  if (s === 0) {
    return 1
  } else if (s === 1) {
    return 0
  } else {
    error('Invalid signal for logical_not: ' + s)
  }
}

function and_gate(input1, input2, output) {
  function and_action_procedure() {
    var new_value = logical_and(get_signal(input1), get_signal(input2))
    after_delay(and_gate_delay, function() {
      set_signal(output, new_value)
    })
  }
  add_action(input1, and_action_procedure)
  add_action(input2, and_action_procedure)
  return 'OK'
}

function logical_and(a, b) {
  if (a === 0) {
    return 0
  } else if (b === 0) {
    return 0
  } else if (a === 1 && b === 1) {
    return 1
  } else {
    error('Invalid signal for logical_and: ' + a + ',' + b)
  }
}

function or_gate(input1, input2, output) {
  function or_action_procedure() {
    var new_value = logical_or(get_signal(input1), get_signal(input2))
    after_delay(or_gate_delay, function() {
      set_signal(output, new_value)
    })
  }
  add_action(input1, or_action_procedure)
  add_action(input2, or_action_procedure)
  return 'OK'
}

function logical_or(a, b) {
  if (a === 1) {
    return 1
  } else if (b === 1) {
    return 1
  } else if (a === 0 && b === 0) {
    return 0
  } else {
    error('Invalid signal for logical_or: ' + a + ',' + b)
  }
}

//implement wires
function make_wire() {
  return pair(0, list())
}

function get_signal(wire) {
  return head(wire)
}

function set_signal(wire, new_value) {
  if (new_value !== get_signal(wire)) {
    set_head(wire, new_value)
  }
}

function add_action(wire, action) {
  action()
  var new_actions = append(tail(wire), list(action))
  set_tail(wire, new_actions)
}

function make_wire_with_local_value() {
  var signal_value = 0
  var action_procedures = []

  function set_signal(new_value) {
    if (signal_value !== new_value) {
      signal_value = new_value
      call_each(action_procedures)
    }
  }

  function add_action_procedure(proc) {
    action_procedures.append(proc)
    proc()
  }

  function dispatch(m) {
    if (m === 'get_signal') {
      return signal_value
    } else if (m === 'set_signal') {
      return set_signal
    } else if (m === 'add_action') {
      return add_action_procedure
    } else {
      error('Unknown operation -- WIRE' + m)
    }
  }

  return dispatch
}

function call_each(procedures) {
  for (let index = 0; index < procedures.length; index++) {
    const procedure = procedures[index];
    procedure()
  }
  return 'done'
}

function get_signal(wire) {
  return wire('get_signal')
}

function set_signal(wire, new_value) {
  return (wire('set_signal'))(new_value)
}

function add_action(wire, action) {
  return (wire('add_action'))(action)
}





