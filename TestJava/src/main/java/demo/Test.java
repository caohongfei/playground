package demo;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import java.util.HashMap;
import java.util.List;

class Test {
    public static void main(String[] args) {
        System.out.println(new TypeToken<List<String>>() {
        }.getType());

        HashMap<String, Object> map = new HashMap<>();
        map.put("abc", 5);
        Gson gson = new Gson();
        System.out.println(gson.toJson(map));
    }
}
