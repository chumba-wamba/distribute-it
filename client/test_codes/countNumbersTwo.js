const main = () => {
  const solution = [];
  for (let i = 0; i < 100; i++) {
    if (i % 3 == 0) {
      solution.push(i);
    }
  }
  return stringify(solution);
};

const stringify = (solution) => {
  solutionStringified = "";
  solution.forEach((element) => (solutionStringified += element + " "));
  return solutionStringified;
};
