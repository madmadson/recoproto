<template>
    <nav>
        <v-app-bar :dark="themeIsDark" app>
            <v-app-bar-nav-icon @click="setDrawer"></v-app-bar-nav-icon>
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
        <v-navigation-drawer :value="drawerIsOpen" app  :dark="themeIsDark">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        PROJECT OCER
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        recommendations simplified
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

            <v-list nav>
                <v-list-item v-for="item in links" :key="item.title" link :to="item.route">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        
        data() {
          return {
              links: [
                  { icon: 'mdi-space-invaders', text: 'Home', route: '/' },
                  { icon: 'mdi-shopify', text: 'Products', route: '/products' },
              ]
          }  
        },
        
        beforeCreate: function() {
            this.$store.dispatch('ui/SUBSCRIBE_THEME')
        },
        beforeDestroy: function() {
            this.$store.dispatch('ui/UNSUBSCRIBE_THEME')
        },

        computed: {
            availableThemes() {
                return this.$store.getters['ui/availableThemes'];
            },
            themeIsDark() {
                return this.$store.getters['ui/themeIsDark'];
            },
            drawerIsOpen() {
                return this.$store.getters['ui/drawerIsOpen'];
            }
        },
        methods: {
            selectTheme: function(theme) {
                this.$store.dispatch('ui/SET_THEME', theme);
            },
            setDrawer: function() {
                this.$store.dispatch('ui/TOGGLE_DRAWER')
            }
        }
    };
</script>
