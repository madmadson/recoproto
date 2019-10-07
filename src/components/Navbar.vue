<template>
    <nav>
        <v-app-bar  flat :dark="themeIsDark" app>
            <v-app-bar-nav-icon @click="setDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-thin">Reco</span>
                <span class="font-weight-black">Proto</span>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-menu id="button-select-theme" :close-on-click="true" :dark="themeIsDark">
                <template v-slot:activator="{ on }">
                    <v-btn  v-on="on">
                        Themes
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item :id="'select-theme-item-' + theme" v-for="theme in availableThemes" :key="theme" @click="setTheme(theme)">
                        <v-list-item-title >{{ theme }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn>
                <span>SignOut</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer :value="drawerIsOpen" app :dark="themeIsDark">
            <v-list>
                <v-list-item>
                    <v-list-item-content >
                        <v-list-item-title class="title">
                            PROJECT OCER
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            recommendations simplified
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-list nav>
                <v-list-item :id="'navigation-' + item.text"  v-for="item in links" :key="item.title" link @click="navigateTo(item.routeName)">
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
                  { icon: 'mdi-space-invaders', text: 'Home', routeName: 'Home' },
                  { icon: 'mdi-shopify', text: 'Products', routeName: 'Products' },
              ]
          }  
        },
        
        beforeCreate: function() {
            //this.$store.dispatch('ui/SUBSCRIBE_THEME')
        },
        beforeDestroy: function() {
            //this.$store.dispatch('ui/UNSUBSCRIBE_THEME')
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
            setTheme: function(theme) {
                this.$store.dispatch('ui/SET_THEME', theme);
            },
            setDrawer: function() {
                this.$store.dispatch('ui/TOGGLE_DRAWER')
            },
            navigateTo: function(routeName) {
                this.$router.replace({ name: routeName }).catch(() => {})
            }
        }
    };
</script>
