
import { db } from '../../main'

const state = {
    theme: 'dark',
    drawerOpen: true,
    availableThemes: ['dark', 'light']
};

const getters = {
    themeIsDark: actualState => {
        return actualState.theme === 'dark';
    },
    availableThemes: actualState => {
        return actualState.availableThemes
    },
    drawerIsOpen: actualState => {
        return actualState.drawerOpen
    }
    
};

const actions = {
    SET_THEME: (context, payload) => {
        context.commit('theme',  payload )
    },
    TOGGLE_DRAWER: (context) => {
        context.commit('drawer',  !context.state.drawerOpen )
    },
    SUBSCRIBE_THEME: (context) => {
        context.commit('subscribeTheme')
    },
    UNSUBSCRIBE_THEME: context => {
        context.commit('unsubscribeTheme')
    }
}

let unsubscribeFirebaseTheme;

const mutations = {
    drawer: (actualState, drawerIsOpen) => {
        actualState.drawerOpen = drawerIsOpen;
    },
    
    theme: (actualState, theme) => {
        
        db.collection("themes").doc('1').set({theme: theme})
        .then(() => {
            console.log("updated");
        })
        .catch((error) => {
            console.log("error: " + error);
        })
    },
    subscribeTheme: actualState => {
        console.log('subscribe to themeUpdates.')
        unsubscribeFirebaseTheme = db.collection("themes")
          .onSnapshot(function(snapshot) {
              snapshot.docChanges().forEach(function(change) {
                  if (change.type === "added") {
                      if(change.doc.id === "1") {
                          actualState.theme = change.doc.data().theme
                      }
                  } else if (change.type === "modified") {
                      if(change.doc.id === "1") {
                          actualState.theme = change.doc.data().theme
                      }
                  } else if (change.type === "removed") {
                      if(change.doc.id === "1") {
                          actualState.theme = "dark"
                      }
                  }
              });
          });
    },
    unsubscribeTheme: () => {
        console.log('unsubscribe from themeUpdates.')
        unsubscribeFirebaseTheme()
    }
    
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}