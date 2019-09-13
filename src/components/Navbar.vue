<template>

    <v-app-bar :dark="themeIsDark" app>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase">
            <span class="font-weight-thin">Reco</span>
            <span class="font-weight-black">Proto</span>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-menu :close-on-click="true">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                    Themes
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="theme in availableThemes" :key="theme" @click="selectTheme(theme)">
                    <v-list-item-title>{{ theme }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn>
            <span>SignOut</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
    </v-app-bar>

</template>

<script>
    export default {
        beforeCreate: function () {
            this.$store.dispatch('ui/subscribeTheme')
        },
        beforeDestroy: function () {
            this.$store.dispatch('ui/unsubscribeTheme')
        },
        
        computed: {
            availableThemes() {
                return this.$store.getters['ui/availableThemes'];
            },
            themeIsDark() {
                return this.$store.getters['ui/actualTheme'] === 'dark';
            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            selectTheme: function(theme) {
                // eslint-disable-next-line no-debugger
                this.$store.commit('ui/theme', theme);
            }
        }
    };
</script>
