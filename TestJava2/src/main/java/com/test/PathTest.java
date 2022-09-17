package com.test;

import javax.ws.rs.*;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

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
        return "None too savory";
    }

    @GET
    @Path("put")
    @Produces("text/html")
    public String put(@QueryParam("text") String text) {
        try {
            buffer.put(text);
            return String.format("Put %s ok", text);
        }
        catch (InterruptedException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GET
    @Path("take")
    @Produces("text/html")
    public String take() {
        try {
            Object str = buffer.take();
            return String.format("%s taken", str);
        }
        catch (InterruptedException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    private static final BoundedBuffer buffer = new BoundedBuffer();
}

class BoundedBuffer {
    final Lock      lock     = new ReentrantLock();
    final Condition notFull  = lock.newCondition();
    final Condition notEmpty = lock.newCondition();

    final Object[] items = new Object[2];
    int putptr, takeptr, count;

    public void put(Object x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length)
                notFull.await();
            items[putptr] = x;
            if (++putptr == items.length) putptr = 0;
            ++count;
            notEmpty.signal();
        }
        finally {
            lock.unlock();
        }
    }

    public Object take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0)
                notEmpty.await();
            Object x = items[takeptr];
            if (++takeptr == items.length) takeptr = 0;
            --count;
            notFull.signal();
            return x;
        }
        finally {
            lock.unlock();
        }
    }
}
