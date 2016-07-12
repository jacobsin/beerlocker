const validateCall = (floors)=> {
  return (call)=> {
    if (call.from == 0 && call.direction == 'down') {
      throw 'cannot call downward from ground floor';
    }
    if (call.from == floors && call.direction == 'up') {
      throw `cannot call upward from floor ${floors}`;
    }
  };
};

export default validateCall;
