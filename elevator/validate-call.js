const validateCall =(call)=> {
  if (call.from == 0 && call.direction == 'down') {
    throw 'cannot call downward from ground floor';
  }
  if (call.from == 10 && call.direction == 'up') {
    throw 'cannot call upward from floor 10';
  }
};

export default validateCall;
