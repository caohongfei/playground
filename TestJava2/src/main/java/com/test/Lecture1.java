package com.test;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author Hongfei Cao
 * @since 2021-12-30 16:52
 */
public class Lecture1 {

    void startDvServer() throws InterruptedException {
        final Long      serverId  = createServerId();
        ReentrantLock   lock      = new ReentrantLock();
        final Condition condition = lock.newCondition();
        serverIdToLocks.put(serverId, lock);
        serverIdToConditions.put(serverId, condition);

        final String containerId = createServerContainer("python");
        lock.lock();
        try {
            if (condition.await(60, TimeUnit.SECONDS)) {
                saveSuccessfulContainer(serverId, containerId);
                serverIdToLocks.remove(serverId);
                serverIdToConditions.remove(serverId);
            }
            else {
                reportTimeout();
            }
        }
        finally {
            lock.unlock();
        }
    }

    void notifyReady(Long serverId) {
        final ReentrantLock lock      = serverIdToLocks.remove(serverId);
        final Condition     condition = serverIdToConditions.remove(serverId);
        if (lock == null || condition == null) {
            System.out.println("已经超时");
            return;
        }
        lock.lock();
        try {
            condition.notify();
        }
        finally {
            lock.unlock();
        }
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

    private static Map<Long, ReentrantLock> serverIdToLocks      = new HashMap<>();
    private static Map<Long, Condition>     serverIdToConditions = new HashMap<>();
}
