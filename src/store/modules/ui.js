
import { db } from '../../main'

// initial state
const state = {
    theme: 'dark',
    availableThemes: ['dark', 'light']
};

const getters = {
    actualTheme: state => {
        return state.theme;
    },
    availableThemes: state => {
        return state.availableThemes
    }
    
};

const actions = {
    subscribeTheme: context => {
        context.commit('subscribeTheme')
    },
    unsubscribeTheme: context => {
        context.commit('unsubscribeTheme')
    }
}

let unsubscribeTheme;

const mutations = {
    theme: (state, theme) => {
        
        db.collection("themes").doc('1').set({theme: theme})
        .then(() => {
            console.log("updated");
        })
        .catch((error) => {
            console.log("error: " + error);
        })
    },
    subscribeTheme: givenState => {
        console.log('subscribe to themeUpdates.')
        unsubscribeTheme = db.collection("themes")
          .onSnapshot(function(snapshot) {
              snapshot.docChanges().forEach(function(change) {
                  if (change.type === "added") {
                      if(change.doc.id === "1") {
                          givenState.theme = change.doc.data().theme
                      }
                  } else if (change.type === "modified") {
                      if(change.doc.id === "1") {
                          givenState.theme = change.doc.data().theme
                      }
                  } else if (change.type === "removed") {
                      if(change.doc.id === "1") {
                          givenState.theme = "dark"
                      }
                  }
              });
          });
    },
    unsubscribeTheme: () => {
        console.log('unsubscribe from themeUpdates.')
        unsubscribeTheme()
    }
    
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}