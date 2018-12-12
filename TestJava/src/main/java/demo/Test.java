package demo;

import com.google.common.reflect.TypeToken;

import java.util.List;

class Test {
    public static void main(String[] args) {
        System.out.println(new TypeToken<List<String>>() {
        }.getType());
    }
}
