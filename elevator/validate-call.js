const validateCall =(call)=> {
  if (call.from == 0 && call.direction == 'down') throw 'cannot call downward from ground floor';
};

export default validateCall;
