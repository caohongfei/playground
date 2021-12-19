package com.test;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 * @author Hongfei Cao
 * @since 2021-12-17 22:02
 */
@Path("abc")
public class PathTest {

    @GET
    @Path("{username}")
    @Produces("text/html")
    public String func(@PathParam("username") String userName) {
        System.out.println(userName);
        return "China is <b>rising</b>";
    }
}
