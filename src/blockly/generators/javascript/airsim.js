Blockly.JavaScript['arm'] = function(block) {
  return 'mission+="arm";';
};

Blockly.JavaScript['disarm'] = function(block) {
  return 'mission+="|disarm;';
};

Blockly.JavaScript['takeoff'] = function(block) {
  return 'mission+="|takeoff";';
};
  
Blockly.JavaScript['takeoff_after'] = function(block) {
  var delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(delay))) {
    return 'mission+="hover," + eval(' + delay + ') + "|takeoff";';
  } else {
    return 'mission+="hover,' + delay + '|takeoff";';
  }
};

Blockly.JavaScript['fly_forward'] = function(block) {
  var xvelocity = Blockly.JavaScript.valueToCode(block, 'xvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_forward,';

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

Blockly.JavaScript['fly_backward'] = function(block) {
  // Prepend negative for backward flight
  var xvelocity = "-" + Blockly.JavaScript.valueToCode(block, 'xvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_backward,';

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

Blockly.JavaScript['fly_left'] = function(block) {
  // Prepend negative for left flight
  var yvelocity = "-" + Blockly.JavaScript.valueToCode(block, 'yvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_left,';

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

Blockly.JavaScript['fly_right'] = function(block) {
  var yvelocity = Blockly.JavaScript.valueToCode(block, 'yvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_right,';

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

Blockly.JavaScript['fly_up'] = function(block) {
  // Prepend negative for up flight
  var zvelocity = "-" + Blockly.JavaScript.valueToCode(block, 'zvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_up,';

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

Blockly.JavaScript['fly_down'] = function(block) {
  var zvelocity = Blockly.JavaScript.valueToCode(block, 'zvelocity', Blockly.JavaScript.ORDER_NONE);
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  var blockString = 'mission+="|fly_down,';

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

Blockly.JavaScript['fly_to_position'] = function(block) {
  var xposition = Blockly.JavaScript.valueToCode(block, 'xposition', Blockly.JavaScript.ORDER_NONE);
  var yposition = Blockly.JavaScript.valueToCode(block, 'yposition', Blockly.JavaScript.ORDER_NONE);
  var zposition = Blockly.JavaScript.valueToCode(block, 'zposition', Blockly.JavaScript.ORDER_NONE);
  
  var blockString = 'mission+="|fly_to_position,';

  if(isNaN(parseInt(xposition))) {
    blockString += '" + eval(' + xposition + ') + "';
  } else {
    blockString += xposition;
  }
  
  if(isNaN(parseInt(yposition))) {
    blockString += '," + eval(' + yposition + ') + "';
  } else {
    blockString += ',' + yposition;
  }
  
  if(isNaN(parseInt(zposition))) {
    blockString += '," + eval(' + zposition + ') + "';
  } else {
    blockString += ',' + zposition;
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

Blockly.JavaScript['yaw_right'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_right," + eval(' + angle + ') + "";';
  } else {
    return 'mission+="|yaw_right,' + angle + '";';
  }
};

Blockly.JavaScript['yaw_left'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_left," + eval(' + angle + ') + "";';
  } else {
    return 'mission+="|yaw_left,' + angle + '";';
  }
};

Blockly.JavaScript['photo'] = function(block) {
  return 'mission+="|photo";';
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

Blockly.JavaScript['flip_forward'] = function(block) {
  return 'mission+="|flip_forward";';
};

Blockly.JavaScript['flip_backward'] = function(block) {
  return 'mission+="|flip_backward";';
};

Blockly.JavaScript['flip_left'] = function(block) {
  return 'mission+="|flip_left";';
};

Blockly.JavaScript['flip_right'] = function(block) {
  return 'mission+="|flip_right";';
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
  return 'mission+="|land";';
};

Blockly.JavaScript['loop'] = function(block) {
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);  
  var branch = Blockly.JavaScript.statementToCode(block, 'DO').trim();
  var code = "for(var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++){" + branch + "}";
  return code;  
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