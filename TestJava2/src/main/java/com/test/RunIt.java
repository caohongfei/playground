package com.test;

import com.google.inject.*;
import com.google.inject.name.Named;
import com.google.inject.name.Names;

import javax.inject.Qualifier;
import java.lang.annotation.Retention;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

public class RunIt {
    @Qualifier
    @Retention(RUNTIME)
    @interface Message {
    }

    @Qualifier
    @Retention(RUNTIME)
    @interface Count {
    }

    static class StringEmitter {
        private final String info;

        @Inject
        // 这里提供没有@Message的StringEmitter
        public StringEmitter(@Named("JDBC") String info) {
            this.info = info;
        }

        public String getInfo() {
            return info;
        }
    }

    /**
     * Guice module that provides bindings for message and count used in
     * {@link Greeter}.
     */
    static class DemoModule extends AbstractModule {

        @Provides
        @Message
        // 这里提供有@Message的StringEmitter
        public StringEmitter provideStringEmitter() {
            return new StringEmitter("jdbc:mysql://localhost:5326");
        }

        @Override
        protected void configure() {
            bindConstant().annotatedWith(Names.named("JDBC")).to("jdbc");
        }
    }

    static class Greeter {
        @Inject
        @Message
        private StringEmitter emitter;

        void sayHello() {
            for (int i = 0; i < 4; i++) {
                System.out.println(emitter.getInfo());
            }
        }
    }

    public static void main(String[] args) {
        /*
         * Guice.createInjector() takes one or more modules, and returns a new Injector
         * instance. Most applications will call this method exactly once, in their
         * main() method.
         */
        Injector injector = Guice.createInjector(new DemoModule());

        /*
         * Now that we've got the injector, we can build objects.
         */
        Greeter greeter = injector.getInstance(Greeter.class);

        // Prints "hello world" 3 times to the console.
        greeter.sayHello();
    }
}
