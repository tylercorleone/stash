class Tester {
  static void test(Function<Integer, Integer> function, int limit) {
    long beginTimeMillis = System.currentTimeMillis();
    System.out.println("Beginning to test "+ function);
    Integer result = function.apply(limit);
    System.out.println("Test concluded. Elapsed time: " + (System.currentTimeMillis() - beginTimeMillis));
    System.out.println("Result: " + result);
  }
}

class OldStyle implements Function<Integer, Integer> {
  public Integer apply(Integer repetitions) {
    int sum = 0;
    for(int i = 0; i < repetitions; ++i) {
      if (i % 2 == 0 && i * i > 4 && i % 3 == 0) {
        sum += i;
      }
    }
    return sum;
  }
}

Function<Integer, Integer> os = new OldStyle();
Function<Integer, Integer> ns = limit -> IntStream.range(0, limit).filter(i -> i % 2 == 0).filter(i -> i * i > 4).filter(i -> i % 3 == 0).sum();
Function<Integer, Integer> nsParallel = limit -> IntStream.range(0, limit).parallel().filter(i -> i % 2 == 0).filter(i -> i * i > 4).filter(i -> i % 3 == 0).sum();

Tester.test(os, 100000000)
Tester.test(ns, 100000000)
Tester.test(nsParallel, 100000000)
