import Vue from '../lib/vue/vue.min';
import * as moment from 'moment';
import * as firebaseModule from './source/firebase';

$(document).ready(() => {
  if(!location.pathname.match(/missions.html/) && !location.pathname.match(/code_board.html/) && !location.pathname.match(/droneblocks-admin/)){
    return;
  }
  var randomColors = [
    '#ddf3f5', '#a6dcef', '#f2aaaa', '#e36387',
    '#efee9d', '#d1eaa3', '#dbc6eb', '#abc2e8'
  ]
  var cardColors = [];

  const db = firebase.firestore();
  const PAGESIZE = 20;

  const secondQuery = text => {
    const lastLetter = String.fromCharCode(text.charCodeAt(text.length - 1) + 1);
    const query = text.slice(0, -1) + lastLetter;
    return query;
  }

  firebase.auth().onAuthStateChanged(user => {
    if(location.pathname.match(/missions.html/)) {
      new Vue({
        el: '#missions',
        template: `
          <template v-if="missions">
            <div v-if="missions.length">
              <div class="container">
  
                <div class="card">
                  <div class="card-content">
                    <table class="highlight missions-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Created</th>
                          <th>Make Public</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(mission, index) in missions">
                          <td>{{index + 1}}</td>
                          <td><div>{{mission.title}}</div></td>
                          <td>{{mission.createdAt}}</td>
                          <td>{{mission.createdAtShort}}</td>
                          <td>
                            <div class="switch" :id="mission.id">
                              <label>
                                Off
                                <input type="checkbox" checked v-if="mission.is_public">
                                <input type="checkbox" v-if="!mission.is_public">
                                <span class="lever"></span>
                                On
                              </label>
                            </div>
                          </td>
                          <td style="text-align: right;">
                            <button v-on:click="select(mission.id)" class="waves-effect waves-light btn z-depth-0 light-blue">
                              <i class="material-icons">edit</i>
                            </button>
                            <button v-on:click="share(mission.id)" class="waves-effect waves-light btn z-depth-0 light-blue">
                              <i class="material-icons">share</i>
                            </button>
                            <button v-on:click="removeItem(mission.id)" class="waves-effect waves-light btn z-depth-0 materialize-red">
                              <i class="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="center-align pt-20">
              <p>You don't have any missions.</p>
            </div>
          </template>
          <div v-else class="center-align pt-20">
            <i class="fa fa-spinner fa-spin fa-2x"></i>
          </div>`,
        data: {
          missions: undefined
        },
        mounted: function(){
          this.getData();
        },
        updated: function () {
          this.$nextTick(function () {
            this.missions.forEach(mission => {
              $(`#${mission.id}`).find("input[type=checkbox]").on("change",function() {
                var status = $(this).prop('checked');
                db.collection('missions').doc(mission.id).update({
                  is_public: status
                }).then(() => {
                  var description = status ? 'public' : 'private';
                  Materialize.toast(`"${mission.title}" is ${description} now.`, 3000);
                });
              });
            })
          })
        },
        methods: {
          select: function(id) {
            localStorage.removeItem('backup');
            localStorage.setItem('missionId', id);
            location.href = '/airsim.html'
          },
          removeItem: function(id) {
            const that = this;
  
            $('#deleteMissionModal').openModal();
  
            $('#deleteMissionButton').off().click(() => {
              db.collection('missions').doc(id).delete();
  
              $('#deleteMissionModal').closeModal();
              that.getData();
  
              if(localStorage.getItem('missionId') === id){
                localStorage.removeItem('missionId');
              }
            })
          },
          share: function(id){
            $("#shareModal").openModal();
    
            if (location.search.indexOf('simulator') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/simulator.html?share=1&missionId=${id}&uid=${user.uid}`);
            // For iOS build 3.0 with camera blocks since we don't want camera blocks for Android or older DB versions on iOS
            } else if (location.pathname.indexOf('ios_missions') > -1) {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/ios.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else if (aircraft == "Tello") {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}&aircraft=tello`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io/tello.html?share=1&missionId=${id}&uid=${user.uid}`);
            } else {
              $("#iPadShareLink").val(`droneblocks://?missionId=${id}&uid=${user.uid}`);
              $("#desktopShareLink").val(`https://dev.droneblocks.io?share=1&missionId=${id}&uid=${user.uid}`);
            }
          },
          getData: function() {
            db.collection('missions').where('uid', '==', user.uid).get().then((v) => {
              if(!v.empty){
                this.missions = v.docs
                  .map(v => ({
                    id: v.ref.id,
                    ...v.data()
                  }))
                  .map(v => ({
                    ...v,
                    createdAtTime: v.createdAt ? new Date(v.createdAt.toDate()) : new Date(),
                    createdAt: moment(v.createdAt.toDate()).format('LLL'),
                    createdAtShort: moment(v.createdAt.toDate()).format('l LT')
                  }))
                  .filter(v => {
                    if(v.aircraft === 'AirSim'){
                      return true;
                    }
                    return false;
                  })
                  .sort((a, b) => a.createdAtTime > b.createdAtTime ? -1 : 1);
              }else{
                this.missions = [];
              }
            })
          }
        }
      });
    }
  })
})