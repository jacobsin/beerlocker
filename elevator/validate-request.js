const validateRequest = (elevator)=> {
  return (request)=> {
    if (request.to == elevator.floor) {
      throw 'cannot request current floor';
    }
    if (request.to < elevator.floor && elevator.direction == 'up') {
      throw 'cannot request floor below current when going up'
    }
    if (request.to > elevator.floor && elevator.direction == 'down') {
      throw 'cannot request floor above current when going down'
    }
  };
};

export default validateRequest;
