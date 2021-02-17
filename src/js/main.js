import * as firebase from './source/firebase';
import * as blockly from './source/blockly';
import * as helpers from './source/helpers';

const connectTo = (drone) => {
    var os = helpers.getMobileOS();

    console.log(os);

    if (os == 'iOS') {

        window.webkit.messageHandlers.observe.postMessage("connectTo" + drone);

    } else if (os == 'Android') {

        // Chrome App
    } else if (os == 'unknown') {

        if (document.location.href.match(/chrome_app/i)) {
            appWindow.postMessage("hideTelemetryBar", appOrigin);
            setTimeout(function () {
                document.location.href = "index.html";
            }, 1000);
        } else {

            console.log('redirect to chrome_app');

            document.location.href = "chrome_app.html";
        }
    }
}

const bind = () => {
    var showCode = false;

    // Let's detect iphone and make the category blocks shorter
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Let's reduce the padding to 5px for the category blocks
    // Not the prettiest way but we'll go with it for now
    if (userAgent.match(/iPhone/i) || (userAgent.match(/Android/i) && userAgent.match(/Mobile\sSafari/i))) {
        $("div#\\:1").css("cssText", "padding: 3px !important");
        $("div#\\:2").css("cssText", "padding: 3px !important");
        $("div#\\:3").css("cssText", "padding: 3px !important");
        $("div#\\:4").css("cssText", "padding: 3px !important");
        $("div#\\:5").css("cssText", "padding: 3px !important");
        $("div#\\:6").css("cssText", "padding: 3px !important");
        $("div#\\:7").css("cssText", "padding: 3px !important");
        $("div#\\:8").css("cssText", "padding: 3px !important");
    }

    $("#codeView").addClass("hidden");

    $('.button-collapse').sideNav({
        edge: 'right',
        closeOnClick: true
    });

    $("#newMission").click(() => {
        localStorage.removeItem('mission');
        $("#missionTitle").text('Untitled Mission');
        Blockly.getMainWorkspace().clear();
    });

    $("#previewMission").click(() => {
        launch();
    });

    $("#showCode").click(() => {
        showCode = !showCode;

        if (showCode) {
            $("#blocklyArea").removeClass("full");
            $("#blocklyArea").addClass("half");
            $("#codeView").removeClass("hidden");
            $("#codeView").addClass("block");
            $("#codeViewButton a").html("X");
            $("#code").html(PR.prettyPrintOne(Blockly.Python.workspaceToCode(blockly.workspace)));
            $("#showCode").text("Hide Mission Code");
        } else {
            $("#showCode").text("Show Mission Code");
            $("#codeView").addClass("hidden");
            $("#codeViewButton a").html("{ Code }");

            if (location.pathname.indexOf('/simulator.html') == -1) {
                $("#blocklyArea").removeClass("half");
                $("#blocklyArea").addClass("full");
            }

        }

        // Call to redraw the view
        blockly.onresize();
    });

    $("#connectTo").click((e) => {
        const text = $(e.target).text();
        if (text.includes("Tello")) {
            connectTo('Tello');
        } else {
            connectTo('DJI');
        }
    });

    $("#saveMission").click(() => {

        // Clear out the mission title from the dialog
        $("#title").text("");

        // We only prompt on the first save of the mission
        if (!localStorage.getItem('missionId')) {
            // Update the save text in the modal
            var h6 = $("#saveMissionModal").find("h6");
            h6.text("Please enter a mission title below and click SAVE");
            h6.css({ "color": "black" });

            $('#saveMissionModal').openModal();
        } else {
            firebase.saveMission(blockly.workspace);
        }
    });

    $("#saveMissionAs").click(() => {
        // Null out the mission id so a new one will be created
        localStorage.removeItem('missionId');

        // We need to figure out what to do if the user hits the cancel button
        $('#saveMissionModal').openModal();
    });

    $("#saveModal").click(() => {
        firebase.saveMission(blockly.workspace);
    });

    $("#logout").click(function () {
        $(".button-collapse").sideNav("hide");
        $("#login").html('<span class="waves-effect waves-light btn z-depth-0 light-blue btn-login">Login</span>');
        $("#login").addClass("center-align");
        $("#logout").hide();
        $("#d1").hide();
        $("#d2").hide();
        $("#d3").hide();
        $("#saveMission").hide();
        $("#saveMissionAs").hide();
        //$("#shareMission").hide();
        $("#myMissions").hide();

        // Send the logout message to iOS
        if (helpers.getMobileOS() == "iOS") {
            window.webkit.messageHandlers.observe.postMessage("logout");
        }

        firebase.auth().signOut();
        localStorage.removeItem('missionId');
        localStorage.removeItem('uid');
    });

    $("#login").click(function () {
        if ($("#login").html().includes('btn-login')) {
            // let successUrl = '/'
            let { pathname, href } = location;
            if (pathname === '/chrome_app.html' || pathname === '/simulator.html') {
                document.location.href = `signin.html?successUrl=${encodeURIComponent(href)}`;
            } else {
                firebase.login();
            }
        }
    });

    $("#cancel_login").click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        let { pathname, search } = location;
        let query = parseQueryInfo(search);
        document.location.href = decodeURIComponent(query.successUrl || '/');
    });

    $("#resetSimulator").click(() => {
        window.commands = ['reset'];
    });

    $("#fullScreen").click(() => {
        var elem = document.getElementById("droneArea");
        openFullscreen(elem);
    });
    $("#toggleGrid").click(() => {
        var toggleGridButton = document.getElementById('toggleGrid');
        if (window.toggle === undefined) {
            window.toggle = false;
            toggleGridButton.innerHTML = '<i class="material-icons">grid_on</i>';
        } else if(window.toggle === true){
            window.toggle = false;
            toggleGridButton.innerHTML = '<i class="material-icons">grid_on</i>';
        } else {
            window.toggle = true;
            toggleGridButton.innerHTML = '<i class="material-icons">grid_off</i>';
        }
    });
    $("#ringGen").click(() => {
        window.ringTrigger = true;
    });
    $("#setUnits").click((e) => {
        const units = $(e.currentTarget).data('units');

        console.log(units);

        if (units == 'metric') {
            localStorage.setItem('units', 'metric');

            if (document.location.href.match(/chrome_app/i)) {
                document.location.href = "chrome_app_metric.html";
            } else {
                document.location.href = "tello_metric.html";
            }
        } else if (units == 'standard') {
            localStorage.setItem('units', 'standard');

            if (document.location.href.match(/chrome_app/i)) {
                document.location.href = "chrome_app.html";
            } else {
                document.location.href = "tello.html";
            }
        }
    })
    $("#updatePassCode").click(() => {
        var currentPassCode = $("#currentPassCode").val();
        var newPassCode = $("#newPassCode").val();
        if( currentPassCode == newPassCode) {
            $("#passCodeModal").closeModal();
        } else if(newPassCode.length === 0) {
            window.alert("Minimum length of Passcode is 1");
        } else {
            firebase.changePassCode(newPassCode.toString());
        }
    });
}


function setupSigninUI(successUrl = '') {
    var uiConfig = {
        // Url to redirect to after a successful sign-in.
        signInSuccessUrl: successUrl,
        callbacks: {
            signInSuccess: function (user, credential, redirectUrl) {
                if (window.opener) {
                    // The widget has been opened in a popup, so close the window
                    // and return false to not redirect the opener.
                    window.close();
                    return false;
                } else {
                    // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
                    return true;
                }
            }
        },
        'accountChooserEnabled': false,
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // Required to enable this provider in One-Tap Sign-up.
                authMethod: "https://accounts.google.com"
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: 'password'
            }
        ],
        // Terms of service url.
        tosUrl: "https://www.google.com",
        credentialHelper: firebaseui.auth.CredentialHelper.NONE // firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
    // within the element corresponding to the selector specified.
    ui.start("#firebaseui-auth-container", uiConfig);
}

function parseQueryInfo(searchInfo) {
    var query = searchInfo.substring(1);
    var vars = query.split('&');
    const obj = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        obj[pair[0]] = pair[1];
    }
    return obj;
}

// Run on document ready
$(document).ready(() => {
    let { pathname, search } = location;
    let query = parseQueryInfo(search);
    // let query = {}, searchSplit = search.split('?')[1];

    // if(searchSplit){
    //     const queryData = searchSplit.split('&');

    // }
    $('.tooltipped').tooltip({ delay: 50 });

    if (pathname === '/simulator.html') {

        $("#passcodeClose").click(() => {
            document.location.href = '/';
        });
        firebase.getPassCode().then((v) => {
            let passCode;
            const savedPpassCode = sessionStorage.getItem("passCode") || null;
            //console.log('entering another mission', v);
            if (v) {
                if(savedPpassCode != v.passCode) {
                    $('#passcodeUserModal').openModal({dismissible:false});
                    $("#passcodeConfirm").click(() => {
                        passCode =  $('#passcode').val();
                        if(passCode == v.passCode) {
                            sessionStorage.setItem("passCode", v.passCode);
                            Materialize.toast('Welcome! Password is correct.', 3000);
                            $('#passcodeUserModal').closeModal();
                        } else {
                            console.log("password is not correct");
                            Materialize.toast('Sorry! Password is incorrect. Please try again.', 3000);
                            $('#passcodeUserModal').isOpen= true;
                        }
                    });
                } else {
                    Materialize.toast('Welcome! Password in session is correct.', 1000);
                }
            }
        })

    }

    if (pathname === '/chrome_app.html' || pathname === '/' || pathname === '/tello.html') {
        if (aircraft === 'DJI') {
            if (pathname !== '/') {
                location.href = '/' + search;
            }
        } else {
            if (helpers.getMobileOS() !== 'unknown') {
                if (pathname !== '/tello.html') {
                    location.href = '/tello.html' + search;
                }
            } else {
                if (pathname !== '/chrome_app.html') {
                    location.href = '/chrome_app.html' + search;
                }
            }
        }
    }


    if (window.Blockly) {
        // Init blockly
        blockly.init();

        if (localStorage.getItem('backup')) {
            console.log('Loading canvas from backup.');

            setTimeout(() => {
                Blockly.getMainWorkspace().clear();
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.getItem('backup')), blockly.workspace);
            }, 1000);
        }
    }

    // Init firebase
    firebase.init(() => {
        if (window.Blockly) {
            firebase.onAuthStateChanged((user) => {
                console.log('user', user);
                if (query && query.share === '1') {
                    return;
                }

                if (localStorage.getItem('missionId') && !localStorage.getItem('backup')) {
                    firebase.getMission(localStorage.getItem('missionId')).then((v) => {
                        //console.log('entering another mission', v);
                        if (v) {
                            $("#missionTitle").text(v.title);

                            setTimeout(() => {
                                Blockly.getMainWorkspace().clear();
                                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(v.missionXML), blockly.workspace);
                            }, 1000);
                        }
                    })
                }
            })
        }
    });

    // Init all bindings

    if (pathname === "/signin.html") {
        setupSigninUI(decodeURIComponent(query.successUrl || '/'));
        bind();
    } else {
        bind();
    }
})

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function launch() {

    let code = 'var mission="";'
    code += Blockly.JavaScript.workspaceToCode(blockly.workspace);
    code = eval(code);
    window.commands = code.split("|"); //Send commands to simulator
    console.log(window.commands);

    // Send from IPC renderer to main process
    ipcRenderer.send("launch", code);


    // This was for C# UWP
    // window.external.notify(code);
        
}

// Receive worldPosition from main process and update UI
ipcRenderer.on("updatePosition", (event, message) => {
    document.getElementById("x_val").textContent = "x: " + message.worldPosition.x_val, + ", "
    document.getElementById("y_val").textContent = "y: " + message.worldPosition.y_val, + ", "
    document.getElementById("z_val").textContent = "z: " + message.worldPosition.z_val

    document.getElementById("lat").textContent = "lat: " + message.gpsPosition.lat, + ", "
    document.getElementById("lon").textContent = "lon: " + message.gpsPosition.lon, + ", "
    document.getElementById("alt").textContent = "alt: " + message.gpsPosition.alt

    document.getElementById("flying").textContent = message.isDroneFlying
})

// We only want to launch with the T key on simulator
// Otherwise this will trigger on Chrome app and possibly mobile
if (document.location.href.includes("simulator")) {
    document.addEventListener("keypress", function (event) {
        let isValidPassCode = !$('#passcodeUserModal').hasClass('open');
        if (isValidPassCode && (event.keyCode == 116) || (event.keyCode == 84)) {
            console.log('T clicked');
            launch();
        }
    });
}