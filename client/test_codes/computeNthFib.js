const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2));

const main = () => {
  const solution = fib(42);
  return String(solution);
};
