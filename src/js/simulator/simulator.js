var scene, camera, renderer, controls, drone;
var blade = [];
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var isFlying = false;
var isFlyingForward = false;
var isOnHeight = false;
var originPosX = 0;
var originPosY = 0;
var originPosZ = 0;
var forwardDistance = 0;
var target;
var originAngle = 0;
var distanceAngle = 0;
var isOnForwardTarget = false;
var isRotating = false;
var rotateTarget = 0;
var isOnRotateTarget = false;
var isLanding = false;
var islanded = false;
let rotateSpeed = Math.PI / 180 * 80; //blade spin speed;
var isHovering = false;
var isHovered = false;
var hoverPeriod = 0;
var clock = 0;
var isFliping = false;

let speed = 20 * 10 * 2.54; // 30in/s in height;
let isSpeedSet = false;
const droneRotateSpeed = Math.PI / 2;

var commandString = "takeoff|flip_left|fly_forward,20,in|yaw_right,180|hover,3|fly_forward,20,in|land|takeoff|fly_forward,20,in|yaw_right,180|fly_forward,20,in|land|takeoff|fly_forward,20,in|yaw_right,180|fly_forward,20,in|land";
var commands = commandString.split("|");
//console.log(commands);
scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
scene.fog = new THREE.Fog(0xcce0ff, 1000, 150000);


var SCREEN_WIDTH = window.innerWidth / 2, SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
// set up camera
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);
camera.position.set(3000, 4000, 3000);
camera.lookAt(scene.position);
scene.add(new THREE.AxesHelper(200000));

// create and start the renderer; choose antialias setting.
if (Detector.webgl) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} else {
  renderer = new THREE.CanvasRenderer();
}

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.getElementById("droneArea").appendChild(renderer.domElement);

// automatically resize renderer
THREEx.WindowResize(renderer, camera);
// toggle full-screen on given key press
//THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 200;
controls.maxDistance = 60000;
controls.maxPolarAngle = Math.PI * 0.48;

const size = 25000; //2500cm, 10cm = 100, 1 = 0.1cm
const divisions = 250;
const gridHelper = new THREE.GridHelper(size, divisions);

//scene.add(gridHelper);

scene.add(new THREE.AmbientLight(0x666666));

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(50, 200, 100);
light.position.multiplyScalar(1.3);

light.castShadow = true;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

var d = 300;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;

light.shadow.camera.far = 1000;

scene.add(light);



// ground
var loader = new THREE.TextureLoader();
var groundTexture = loader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100000, 100000), groundMaterial);
mesh.position.y = 0;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);



var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};
var onError = function (xhr) { };
var droneImage = "https://cors-anywhere.herokuapp.com/https://bfmblob.blob.core.windows.net/partlibrary/Textures/Drone_mat_Diffuse.png"
var bodyTexture = new THREE.TextureLoader().load(droneImage);

var lightImage = "https://cors-anywhere.herokuapp.com/https://bfmblob.blob.core.windows.net/partlibrary/Textures/LED%20_Emissive.png";
var lightTexture = new THREE.TextureLoader().load(lightImage);

var glassImage = "https://cors-anywhere.herokuapp.com/https://bfmblob.blob.core.windows.net/partlibrary/Textures/glass_mat%20_Normal.png";
var glassTexture = new THREE.TextureLoader().load(glassImage);

var loader = new THREE.OBJLoader(manager);
loader.crossOrigin = 'anonymous';
loader.load('https://cors-anywhere.herokuapp.com/https://bfmblob.blob.core.windows.net/partlibrary/drone_object.obj', function (object) {

  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material.map = bodyTexture;
      console.log(child);
      if (child.name == "green_light") {
        child.material.map = lightTexture;
      }
      if (child.name == "glass") {
        child.material.map = glassTexture;
      }
    }
  });
  drone = object;
  scene.add(drone);
  blade[0] = scene.getObjectByName("Blade01");
  blade[1] = scene.getObjectByName("Blade02");
  blade[2] = scene.getObjectByName("Blade03");
  blade[3] = scene.getObjectByName("Blade04");
  moveAxis(drone, blade[0]);
  moveAxis(drone, blade[1]);
  moveAxis(drone, blade[2]);
  moveAxis(drone, blade[3]);
}, onProgress, onError);

let then = 0;

(function animate(now) {
  window.addEventListener("resize", handleWindowResize);
  now *= 0.001;  // make it seconds

  const delta = now - then;
  //console.log(now);
  then = now;
  if (drone) {                //If model is loaded
    //camera.lookAt(scene.position);        
    if (isFlying) {
      blade[0].rotation.y -= rotateSpeed;
      blade[1].rotation.y += rotateSpeed;
      blade[2].rotation.y -= rotateSpeed;
      blade[3].rotation.y += rotateSpeed;
      verticalFly(delta);
      fly(delta);
      yawRotate(delta);
      flip(delta);
    }
    if (commands[0] && commands[0].includes("takeoff")) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        isFlying = true;
        rotateSpeed = Math.PI / 180 * 80;
        clock = 0;
      }
    }
    if (commands[0] && commands[0].includes("fly") && !isFlyingForward) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        flySetting(commands[0]);
        clock = 0;
      }
    }
    if (commands[0] && commands[0].includes("yaw") && !isRotating) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        yawRotateSetting(commands[0]);
        clock = 0;
      }
    }
    if (commands[0] && commands[0].includes("speed") && !isSpeedSet) {
      speedControl(commands[0]);
      commands.shift();
    }
    if (commands[0] && commands[0].includes("hover")) {
      const subcommands = commands[0].split(",");
      hoverPeriod = subcommands[1];
      clock += delta;
      if (clock > hoverPeriod) {
        commands.shift();
        clock = 0;
      }
    }
    if (commands[0] && commands[0].includes("flip") && !isFliping) {
      hoverPeriod = 1;
      clock += delta;
      const direction = getDirection(commands[0]);
      if (clock > hoverPeriod) {
        clock = 0;
        isFliping = true;
        if ((direction == 'left') || (direction == 'right')) {
          originAngle = drone.rotation.z;
        } else {
          originAngle = drone.rotation.x
        }
      }
    }
    if (commands[0] && commands[0].includes("land") && !islanded) {
      hoverPeriod = 1;
      clock += delta;
      if (clock > hoverPeriod) {
        land(delta);
      }
    }

  }
  //console.log(commands[0]);
  requestAnimationFrame(animate);
  render();
  update();
})();

function update() {
  controls.update();
}
function render() {
  renderer.render(scene, camera);
}
function handleWindowResize() {
  const width = document.getElementById("droneArea").clientWidth;
  const height = document.getElementById("droneArea").clientHeight;

  this.renderer.setSize(width, height);
  camera.aspect = width / height;

  // Note that after making changes to most of camera properties you have to call
  // .updateProjectionMatrix for the changes to take effect.
  camera.updateProjectionMatrix();
};

function moveAxis(object, mesh) {
  // Create a bounding box:
  var box = new THREE.Box3().setFromObject(mesh);
  // Reset mesh position:
  box.getCenter(mesh.position);
  var pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(mesh);
  mesh.geometry.center();
  object.add(mesh);
}

function distanceVector(point1, point2) {
  var dx = point1.x - point2.x;
  var dy = point1.y - point2.y;
  var dz = point1.z - point2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function yawRotateSetting(command) {
  isRotating = true;
  originAngle = drone.rotation.y;
  const subcommands = command.split(",");
  //console.log(subcommands);
  distanceAngle = subcommands[1] * Math.PI / 180;
}

function yawRotate(delta) {
  const shiftAngle = Math.abs(drone.rotation.y - originAngle);
  if (isRotating && (shiftAngle < distanceAngle)) {
    isOnRotateTarget = false;
    const direction = getDirection(commands[0]);
    if (direction == 'right') {
      drone.rotation.y += delta * droneRotateSpeed;
    } else {
      drone.rotation.y -= delta * droneRotateSpeed;
    }
  } else if (isRotating && (shiftAngle >= distanceAngle) && !isOnRotateTarget) {
    isOnRotateTarget = true;
    isOnForwardTarget = false;
    isRotating = false;
    commands.shift();
  }
}

function flySetting(command) {
  isFlyingForward = true;
  originPosX = drone.position.x;
  originPosY = drone.position.y;
  originPosZ = drone.position.z;
  const subcommands = command.split(",");
  const distanceUnit = subcommands[subcommands.length - 1];
  const direction = getDirection(command);
  console.log(direction);
  let distance;
  if (direction == 'xyz') {
    if (distanceUnit == "in") {
      target = {
        x: subcommands[2] * 10 * 2.54, //webGl x asix = y in real;
        y: subcommands[3] * 10 * 2.54, //webGL y axis = z in real;
        z: subcommands[1] * 10 * 2.54,  //webGL z axis = x in real 
      }
    } else if (distanceUnit == "cm") {
      target = {
        x: subcommands[2] * 10, //webGl x asix = y in real;
        y: subcommands[3] * 10, //webGL y axis = z in real;
        z: subcommands[1] * 10,  //webGL z axis = x in real;
      }
    }
    forwardDistance = distanceVector(drone.position, target);
  } else {
    distance = subcommands[1];
    if (distanceUnit == "in") {
      forwardDistance = distance * 10 * 2.54 // Inchi to cm;
    } else if (distanceUnit == "cm") {
      forwardDistance = distance * 10 // number to cm

    }
  }
}
function verticalFly(delta) {
  if (!isOnHeight && drone.position.y < 1520) {  // Drone Height is 152cm;
    drone.position.y += delta * speed;
  } else if ((drone.position.y >= 1520) && !isOnHeight) {
    isOnHeight = true;
    commands.shift();
  }
}
function fly(delta) {
  const shiftLength = distanceVector(drone.position, { x: originPosX, y: originPosY, z: originPosZ });
  if (isOnHeight && isFlyingForward && (shiftLength < forwardDistance)) {
    isOnForwardTarget = false;
    const direction = getDirection(commands[0]);
    switch (direction) {
      case 'forward':
        drone.position.z += delta * speed * Math.cos(drone.rotation.y);
        drone.position.x += delta * speed * Math.sin(drone.rotation.y);
        break;
      case 'backward':
        drone.position.z -= delta * speed * Math.cos(drone.rotation.y);
        drone.position.x -= delta * speed * Math.sin(drone.rotation.y);
        break;
      case 'up':
        drone.position.y += delta * speed;
        break;
      case 'down':
        if (drone.position.y > 0) {
          drone.position.y -= delta * speed;
        }
        break;
      case 'right':
        drone.position.z += delta * speed * Math.cos(drone.rotation.y - Math.PI / 2);
        drone.position.x += delta * speed * Math.sin(drone.rotation.y - Math.PI / 2);
        break;
        console.log(Math.cos(drone.rotation.y + Math.PI / 2));
      case 'left':
        drone.position.z -= delta * speed * Math.cos(drone.rotation.y - Math.PI / 2);
        drone.position.x -= delta * speed * Math.sin(drone.rotation.y - Math.PI / 2);
        break;
      case 'xyz':
        if (drone.position.y > 0) {
          console.log(forwardDistance);
          console.log(target);
          const speedRatio = (target.y - originPosY) / forwardDistance;
          console.log(speedRatio)
          drone.position.x += delta * speed * (target.x - originPosX) / forwardDistance;
          drone.position.y += delta * speed * (target.y - originPosY) / forwardDistance;
          drone.position.z += delta * speed * (target.z - originPosZ) / forwardDistance;
          console.log(drone.position);
        }
        break;
      default:
      //console.log(drone.position);

    }

  } else if (isFlyingForward && !isOnForwardTarget && (shiftLength >= forwardDistance)) {
    isOnForwardTarget = true;
    isFlyingForward = false;
    commands.shift();
  }
}

function flip(delta) {
  const direction = getDirection(commands[0]);
  const distanceAngle = Math.PI * 2;
  let angleShift;
  if ((direction == 'left') || (direction == 'right')) {
    angleShift = Math.abs(drone.rotation.z - originAngle);
  } else {
    angleShift = Math.abs(drone.rotation.x - originAngle);
  }
  if ((angleShift < distanceAngle) && isFliping) {
    switch (direction) {
      case 'forward':
        drone.rotation.x += delta * droneRotateSpeed;
        break;
      case 'backward':
        drone.rotation.x -= delta * droneRotateSpeed;
        break;
      case 'right':
        drone.rotation.z += delta * droneRotateSpeed;
        break;
      case 'left':
        drone.rotation.z -= delta * droneRotateSpeed;
        break;
    }
  } else if ((angleShift >= distanceAngle) && isFliping) {
    isFliping = false;
    commands.shift();
  }

}
function land(delta) {
  if (drone.position.y > 0) {
    drone.position.y -= delta * speed;
  } else {
    let speedLimit;
    if (commands.length == 1) {
      speedLimit = 0.01;
    } else {
      speedLimit = rotateSpeed;
    }
    rotateSpeed -= delta * rotateSpeed;
    if (rotateSpeed <= speedLimit) {
      isFlying = false;
      isLanded = true;
      isOnHeight = false;
      commands.shift();
      clock = 0;
    }
  }
}

function getDirection(command) {
  const subcommands = command.split(",");
  const direction = subcommands[0].split("_")[1];
  return direction;
}

function speedControl(command) {
  const subcommands = command.split(",");
  const speedFactor = subcommands[1];
  const speedUnit = subcommands[2];
  if (speedUnit == 'in/s') {
    speed = speedFactor * 10 * 2.54;
  } else if (speedUnit == 'cm/s') {
    speed = speedFactor * 10;
  }
}
