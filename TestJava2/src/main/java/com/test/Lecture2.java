package com.test;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * @author Hongfei Cao
 * @since 2021-12-30 16:52
 */
public class Lecture2 {

    void startDvServer() throws InterruptedException {
        final Long           serverId = createServerId();
        final CountDownLatch latch    = new CountDownLatch(1);
        serverIdToLatches.put(serverId, latch);

        final String containerId = createServerContainer("python");
        if (latch.await(60, TimeUnit.SECONDS)) {
            saveSuccessfulContainer(serverId, containerId);
            serverIdToLatches.remove(serverId);
        }
        else {
            reportTimeout();
        }
    }

    void notifyReady(Long serverId) {
        final CountDownLatch latch = serverIdToLatches.remove(serverId);
        if (latch == null) {
            System.out.println("已经超时");
            return;
        }
        latch.countDown();
    }

    private void saveSuccessfulContainer(Long p1, String p2) {
    }

    private void reportTimeout() {
    }

    private Long createServerId() {
        return 1L;
    }

    private String createServerContainer(String imageName) {
        return "a";
    }

    private static Map<Long, CountDownLatch> serverIdToLatches = new HashMap<>();
}
