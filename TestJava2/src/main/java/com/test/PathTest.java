package com.test;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * @author Hongfei Cao
 * @since 2021-12-17 22:02
 */
@Path("abc")
public class PathTest {

    @GET
    public String func() {
        return "China is rising";
    }
}
