Blockly.JavaScript['arm'] = function(block) {
  return 'mission+="arm,' + block.id + '";';
};

Blockly.JavaScript['disarm'] = function(block) {
  return 'mission+="|disarm,' + block.id + '";';
};

Blockly.JavaScript['takeoff'] = function(block) {
  return 'mission+="|takeoff,' + block.id + '";';
};
  
Blockly.JavaScript['takeoff_after'] = function(block) {
  var delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(delay))) {
    return 'mission+="|hover," + eval(' + delay + ') + "|takeoff";';
  } else {
    return 'mission+="|hover,' + delay + '|takeoff";';
  }
};

Blockly.JavaScript['coordinate_system'] = function(block) {
  var cs = block.getFieldValue("coordinate_system");
  return 'mission+="|coordinate_system,' + cs + '";';
};

Blockly.JavaScript['drive_train'] = function(block) {
  var dt = block.getFieldValue("drive_train");
  return 'mission+="|drive_train,' + dt + '";';
};

Blockly.JavaScript['fly_x'] = function(block) {
  var xvelocity = Blockly.JavaScript.valueToCode(block, 'xvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_x,';

  if(isNaN(parseInt(xvelocity))) {
    blockString += '" + eval(' + xvelocity + ') + "';
  } else {
    blockString += xvelocity;
  }

  if(isNaN(parseInt(duration))) {
    blockString += '," + eval(' + duration + ') + "';
  } else {
    blockString += ',' + duration;
  }

  blockString += '";';

  return blockString;

};

Blockly.JavaScript['fly_y'] = function(block) {
  var yvelocity = Blockly.JavaScript.valueToCode(block, 'yvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_y,';

  if(isNaN(parseInt(yvelocity))) {
    blockString += '" + eval(' + yvelocity + ') + "';
  } else {
    blockString += yvelocity;
  }

  if(isNaN(parseInt(duration))) {
    blockString += '," + eval(' + duration + ') + "';
  } else {
    blockString += ',' + duration;
  }

  blockString += '";';

  return blockString;

};

Blockly.JavaScript['fly_z'] = function(block) {
  var zvelocity = Blockly.JavaScript.valueToCode(block, 'zvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_z,';

  if(isNaN(parseInt(zvelocity))) {
    blockString += '" + eval(' + zvelocity + ') + "';
  } else {
    blockString += zvelocity;
  }

  if(isNaN(parseInt(duration))) {
    blockString += '," + eval(' + duration + ') + "';
  } else {
    blockString += ',' + duration;
  }

  blockString += '";';

  return blockString;

};

Blockly.JavaScript['fly_to_location'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_NONE);
  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_NONE);
  var z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_NONE);
  
  var blockString = 'mission+="|fly_to_location,';

  if(isNaN(parseInt(x))) {
    blockString += '" + eval(' + x + ') + "';
  } else {
    blockString += x;
  }
  
  if(isNaN(parseInt(y))) {
    blockString += '," + eval(' + y + ') + "';
  } else {
    blockString += ',' + y;
  }
  
  if(isNaN(parseInt(z))) {
    blockString += '," + eval(' + z + ') + "';
  } else {
    blockString += ',' + z;
  }

  blockString += '";';
  
  return blockString;
  
};

Blockly.JavaScript['fly_rpy'] = function(block) {
  var r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_NONE);
  var p = Blockly.JavaScript.valueToCode(block, 'p', Blockly.JavaScript.ORDER_NONE);
  var y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_NONE);
  var seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_NONE);
  
  var blockString = 'mission+="|fly_rpy,';

  if(isNaN(parseInt(r))) {
    blockString += '" + eval(' + r + ') + "';
  } else {
    blockString += r;
  }
  
  if(isNaN(parseInt(p))) {
    blockString += '," + eval(' + p + ') + "';
  } else {
    blockString += ',' + p;
  }
  
  if(isNaN(parseInt(y))) {
    blockString += '," + eval(' + y + ') + "';
  } else {
    blockString += ',' + y;
  }

  if(isNaN(parseInt(seconds))) {
    blockString += '," + eval(' + seconds + ') + "';
  } else {
    blockString += ',' + seconds;
  }

  blockString += '";';
  
  return blockString;
  
};

Blockly.JavaScript['curve'] = function(block) {
  var x1distance = Blockly.JavaScript.valueToCode(block, 'x1distance', Blockly.JavaScript.ORDER_NONE);
  var y1distance = Blockly.JavaScript.valueToCode(block, 'y1distance', Blockly.JavaScript.ORDER_NONE);
  var z1distance = Blockly.JavaScript.valueToCode(block, 'z1distance', Blockly.JavaScript.ORDER_NONE);
  var x2distance = Blockly.JavaScript.valueToCode(block, 'x2distance', Blockly.JavaScript.ORDER_NONE);
  var y2distance = Blockly.JavaScript.valueToCode(block, 'y2distance', Blockly.JavaScript.ORDER_NONE);
  var z2distance = Blockly.JavaScript.valueToCode(block, 'z2distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  
  var blockString = 'mission+="|curve,';

  if(isNaN(parseInt(x1distance))) {
    blockString += '" + eval(' + x1distance + ') + "';
  } else {
    blockString += x1distance;
  }
  
  if(isNaN(parseInt(y1distance))) {
    blockString += '," + eval(' + y1distance + ') + "';
  } else {
    blockString += ',' + y1distance;
  }
  
  if(isNaN(parseInt(z1distance))) {
    blockString += '," + eval(' + z1distance + ') + "';
  } else {
    blockString += ',' + z1distance;
  }

  if(isNaN(parseInt(x2distance))) {
    blockString += '," + eval(' + x2distance + ') + "';
  } else {
    blockString += ',' + x2distance;
  }
  
  if(isNaN(parseInt(y2distance))) {
    blockString += '," + eval(' + y2distance + ') + "';
  } else {
    blockString += ',' + y2distance;
  }
  
  if(isNaN(parseInt(z2distance))) {
    blockString += '," + eval(' + z2distance + ') + "';
  } else {
    blockString += ',' + z2distance;
  }  
  
  blockString += "," + units;
  blockString += '";';
  
  return blockString;
  
};

Blockly.JavaScript['hover'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(duration))) {
    return 'mission+="|hover," + eval(' + duration + ') + "";';
  } else {
    return 'mission+="|hover,' + duration + '";';
  }
};

Blockly.JavaScript['rotate_to_yaw'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="|rotate_to_yaw," + eval(' + angle + ') + "";';
  } else {
    return 'mission+="|rotate_to_yaw,' + angle + '";';
  }
};

Blockly.JavaScript['rotate_yaw_rate'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|rotate_yaw_rate,';

  if(isNaN(parseInt(angle))) {
    blockString += '" + eval(' + angle + ') + "';
  } else {
    blockString += angle;
  }

  if(isNaN(parseInt(seconds))) {
    blockString += '," + eval(' + seconds + ') + "';
  } else {
    blockString += ',' + seconds;
  }

  blockString += '";';

  return blockString;

};
Blockly.JavaScript['photo'] = function(block) {
  return 'mission+="|photo,' + block.id + '";';
};

Blockly.JavaScript['photo_interval'] = function(block) {
  var photo_count = Blockly.JavaScript.valueToCode(block, 'photo_count', Blockly.JavaScript.ORDER_NONE);
  var interval = Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_NONE);

  var blockString = 'mission+="|photo_interval,';

  if(isNaN(parseInt(photo_count))) {
    blockString += '" + eval(' + photo_count + ') + "';
  } else {
    blockString += photo_count;
  }
  
  if(isNaN(parseInt(interval))) {
    blockString += '," + eval(' + interval + ') + "';
  } else {
    blockString += ',' + interval;
  }

  blockString += '";';

  return blockString;
};

Blockly.JavaScript['pitch_gimbal'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|pitch_gimbal,';

  if(isNaN(parseInt(angle))) {
    blockString += '" + eval(' + angle + ') + "';
  } else {
    blockString += angle;
  }

  blockString += '";';

  return blockString;
};

Blockly.JavaScript['land_then_takeoff'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(duration))) {
    return 'mission+="|land|hover," + eval(' + duration + ') + "|takeoff";';
  } else {
    return 'mission+="|land|hover,' + duration + '|takeoff";';
  }
};

Blockly.JavaScript['land'] = function(block) {
  return 'mission+="|land,' + block.id + '";';
};

Blockly.JavaScript['return_home'] = function(block) {
  return 'mission+="|return_home";';
};

Blockly.JavaScript['loop'] = function(block) {
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);  
  var branch = Blockly.JavaScript.statementToCode(block, 'DO').trim();
  var code = "for(var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++){" + branch + "}";
  return code;  
};

Blockly.JavaScript['wind'] = function(block) {
  var north = Blockly.JavaScript.valueToCode(block, 'north', Blockly.JavaScript.ORDER_NONE);
  var east = Blockly.JavaScript.valueToCode(block, 'east', Blockly.JavaScript.ORDER_NONE);
  var down = Blockly.JavaScript.valueToCode(block, 'down', Blockly.JavaScript.ORDER_NONE);
  
  var blockString = 'mission+="|wind,';

  if(isNaN(parseInt(north))) {
    blockString += '" + eval(' + north + ') + "';
  } else {
    blockString += north;
  }
  
  if(isNaN(parseInt(east))) {
    blockString += '," + eval(' + east + ') + "';
  } else {
    blockString += ',' + east;
  }
  
  if(isNaN(parseInt(down))) {
    blockString += '," + eval(' + down + ') + "';
  } else {
    blockString += ',' + down;
  }

  blockString += '";';
  
  return blockString;
};

Blockly.JavaScript['weather_enable'] = function(block) {
  var enable = block.getFieldValue("enable");
  return 'mission+="|weather_enable,' + enable + '";';
};

Blockly.JavaScript['weather_set'] = function(block) {
  var weather = block.getFieldValue("weather");
  var intensity = Blockly.JavaScript.valueToCode(block, 'intensity', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|weather_set,' + weather + ',';

  if(isNaN(parseInt(intensity))) {
    blockString += '" + eval(' + intensity + ') + "';
  } else {
    blockString += intensity;
  }

  blockString += '";';
  
  return blockString;
};