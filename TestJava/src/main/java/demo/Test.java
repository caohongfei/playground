package demo;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

public class Test<T> {
    public List<T> list;

    public static void main(String[] args) throws Exception {
        Test<String> sub = new Test<String>() {
        };
        final ParameterizedType genericTypeOfField = (ParameterizedType) sub.getClass().getField("list")
                .getGenericType();

        final Type actualTypeArgumentOfField = genericTypeOfField.getActualTypeArguments()[0];
        final Type typeParameterOfClass      = Test.class.getTypeParameters()[0];

        System.out.println(actualTypeArgumentOfField == typeParameterOfClass);
    }
}