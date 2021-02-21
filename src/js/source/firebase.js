import config from '../../../env/config.prod.json';
import * as helpers from './helpers';

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth;

db.enablePersistence({synchronizeTabs:true});

const onAuthStateChanged = (callback) => {
    const connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on('value', (snap) => {
        const uid = localStorage.getItem('uid');
        if (snap.val() === false && uid) {
            callback({uid});
        }
    });
    

    auth().onAuthStateChanged((user) => {
        if(user){
            localStorage.setItem('uid', user.uid);
        }

        callback(user);
    });
}

const init = (onAfterInit = () => {}) => {
    const launchScreen = (name) => {
        // Change the login button with the user's name if it exists
        if (!name)
            $("#login").html('<a href="#" id="userInfo" class="light-blue lighten-3 white-text">Hi!</a>');
        else
            $("#login").html('<a href="#" id="userInfo" class="light-blue lighten-3 white-text">Hi ' + name.split(" ")[0] + '!</a>');
        
        $("#login").removeClass("center-align");

        $("#d1").css('display', 'block');
        $("#d2").css('display', 'block');
        $("#d3").css('display', 'block');
        $("#saveMission").css('display', 'block');
        $("#saveMissionAs").css('display', 'block');
        $("#myMissions").css('display', 'block');
        $("#logout").css('display', 'block');
    }
    
    onAuthStateChanged((user) => {
        let { pathname } = location;

        if (user) {

            db.collection('users').doc(user.uid).get().then((userData) => {
                if(userData.exists){
                    db.collection('users').doc(user.uid).update({
                        loginAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    // if (userData.data().has_simulator_access && userData.data().has_simulator_access === 1
                    //     && !pathname.includes('simulator.html')) {
                    //     document.location.href = 'simulator.html';
                    // } else if (!!pathname.includes('simulator.html')) {
                    //     // document.location.href = '/';
                    // }
                    launchScreen((userData.data().displayName));
                }else{
                    const providerData = user.providerData[0];

                    db.collection('users').doc(user.uid).set({
                        uid: providerData.uid,
                        providerId: providerData.providerId,
                        displayName: providerData.displayName,
                        photoURL: providerData.photoURL,
                        email: providerData.email,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        loginAt: firebase.firestore.FieldValue.serverTimestamp(),
                        has_simulator_access: 0
                    });
                    launchScreen(providerData.displayName);
                }

                onAfterInit();
            })
        // } else {
        //     if (pathname.includes('simulator.html')) {
        //         document.location.href = 'signin.html';
        //     }
        }
    });
}

const saveMission = (workspace) => {
    const user = firebase.auth().currentUser;

    if (user) {
        localStorage.removeItem('backup');
        
        var missionXML = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        const missionId = localStorage.getItem('missionId');

        if(!missionId && !$("#title").val()) {
            var h6 = $("#saveMissionModal").find("h6");
            h6.text("You must provide a mission title before saving");
            h6.css({"color": "red"});
            return;
        }

        db.collection('users').doc(user.uid).get().then((res) => {
            if(!res.exists){
                location.href = "/";
                return;
            }

            var userData = res.data();
            var missions = Array.prototype.slice.call(userData.missions || []);

            var _missionId = missionId;

            if(!_missionId){
                _missionId = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

                db.collection('missions').doc(_missionId).set({
                    uid: user.uid,
                    aircraft: 'AirSim',
                    title: $("#title").val(),
                    missionXML,
                    createdAt: new Date(),
                    is_public: false,
                    likeCount: 0,
                    likeMembers: [],
                })
            }else{
                db.collection('missions').doc(_missionId).update({
                    missionXML
                })
            }
            
            // db.collection('users').doc(user.uid).update({missions});

            if($("#title").val()){
                $("#missionTitle").text($("#title").val());
            }
        
            Materialize.toast(`Your mission has been ${missionId === _missionId ? 'updated' : 'created'} and saved`, 3000);
            localStorage.setItem('missionId', _missionId);
            $('#saveMissionModal').closeModal();
        })      
    }
}

const getMission = (id) => {
    const user = firebase.auth().currentUser;

    if(!user){
        return;
    }

    return new Promise((resolve, reject) => {
        db.collection('missions').doc(id).get().then((v) => resolve(v.data())).catch(e => reject(e));
    })
}

const getPassCode = () => {
    return new Promise((resolve, reject) => {
        db.collection('data').doc('admin').get().then((v) => resolve(v.data())).catch(e => reject(e));
    })
}

const changePassCode = (passCode) => {
    $("#updatePassCode").html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
    db.collection('data').doc('admin').set({
        passCode
    }).then(() => {
        $("#updatePassCode").html('UPDATE');
        Materialize.toast('Passcode Updated!', 3000);
        $("#passCodeModal").closeModal();
    })
}

const login = () => {
    // This was introduced because of Google auth requirements
    if(helpers.getMobileOS() == 'iOS') {
        
        // Send the login message to iOS
        window.webkit.messageHandlers.observe.postMessage("login");
        
        // Hide the side bar after button click
        $(".button-collapse").sideNav("hide");
    
    } else if (helpers.getMobileOS() == 'Android') {
            
        // Call the login method in Android WebAppInterface
        Android.login();
        
        // Hide the side bar after button click
        $(".button-collapse").sideNav("hide");
        
    } else {
    
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("email");
        firebase.auth().signInWithRedirect(provider);
            
    }
}

// // This gets called from iOS after token is received
// function loginFromiOS(idToken) {
//     var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
//     firebase.auth().signInWithCredential(credential).catch(function(error) {
//       //Materialize.toast("Error with signinWithCredential", 3000);
//     });
//   }

//   // Called from Android onActivityResult
//   function loginFromAndroid(idToken) {
//     var credential = firebase.auth.GoogleAuthProvider.credential(idToken);
//     firebase.auth().signInWithCredential(credential).catch(function(error) {
//     });
// }

export {
    init,
    saveMission,
    getMission,
    login,
    onAuthStateChanged,
    getPassCode,
    changePassCode,
    db,
    auth
};