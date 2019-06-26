package demo;

class Test {
    public static void main(String[] args) {
//        test();
        String s = "abc'def";
        String x = s.replaceAll("'", "\\\\'");
        System.out.println(x);
    }

    private static void test() {
        int count = 10000000, times = 3000;
        Integer[] integers = new Integer[count];
        for (int i = 0; i < count; i++) {
            integers[i] = ((int) (Math.random() * 10000000));
        }
        boolean x;
        long s = System.currentTimeMillis();
        for (int k = 0; k < times; k++) {
            for (int i = 0; i < count; i++) {
                x = (integers[i] & 1) == 1;
            }
        }
        System.out.println(System.currentTimeMillis() - s);

        s = System.currentTimeMillis();
        for (int k = 0; k < times; k++) {
            for (int i = 0; i < count; i++) {
                x = (integers[i] % 7 != 0);
            }
        }
        System.out.println(System.currentTimeMillis() - s);
    }
}
