<template>
    <div>About</div>
    <div><button v-on:click="goToDashboard">Click</button></div>
</template>

<script>
    export default {
        name: 'About',
        props: {
            msg: String
        },
        created() {
            console.log('about created')
        },
        unmounted() {
            console.log('about unmounted')
        },
        methods: {
            goToDashboard() {
                console.log(this.$router)
            }
        }
    }
</script>
