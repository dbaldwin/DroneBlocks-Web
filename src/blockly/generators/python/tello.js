Blockly.Python['takeoff'] = function(block) {
  return 'takeOff();\n';
};

Blockly.Python['takeoff_after'] = function(block) {
  var delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_NONE);
  return 'takeOffAfter(' + delay + ');\n';
};

Blockly.Python['set_speed'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'setSpeed(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_forward'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyForward(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_backward'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyBackward(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_left'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyLeft(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_right'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyRight(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_up'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyUp(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_down'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyDown(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_xyz'] = function(block) {
  var xdistance = Blockly.Python.valueToCode(block, 'xdistance', Blockly.JavaScript.ORDER_NONE);
  var ydistance = Blockly.Python.valueToCode(block, 'ydistance', Blockly.JavaScript.ORDER_NONE);
  var zdistance = Blockly.Python.valueToCode(block, 'zdistance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyXYZ(' + xdistance + ', ' + ydistance + ', ' + zdistance + ', "' + units + '");\n';
};

Blockly.Python['curve'] = function(block) {
  var x1distance = Blockly.Python.valueToCode(block, 'x1distance', Blockly.JavaScript.ORDER_NONE);
  var y1distance = Blockly.Python.valueToCode(block, 'y1distance', Blockly.JavaScript.ORDER_NONE);
  var z1distance = Blockly.Python.valueToCode(block, 'z1distance', Blockly.JavaScript.ORDER_NONE);
  var x2distance = Blockly.Python.valueToCode(block, 'x2distance', Blockly.JavaScript.ORDER_NONE);
  var y2distance = Blockly.Python.valueToCode(block, 'y2distance', Blockly.JavaScript.ORDER_NONE);
  var z2distance = Blockly.Python.valueToCode(block, 'z2distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyCurve(' + x1distance + ', ' + y1distance + ', ' + z1distance + ', ' + x2distance + ', ' + y2distance + ', ' + z2distance + ', "' + units + '");\n';
};

Blockly.Python['yaw_right'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yawRight(' + angle + ');\n';
};

Blockly.Python['yaw_left'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yawLeft(' + angle + ');\n';
};

Blockly.Python['battery'] = function(block) {
  return ['getBattery();\n', Blockly.JavaScript.ORDER_NONE];
};

Blockly.Python['flip_forward'] = function(block) {
  return 'flipForward();\n';
};

Blockly.Python['flip_backward'] = function(block) {
  return 'flipBackward();\n';
};

Blockly.Python['flip_left'] = function(block) {
  return 'flipLeft();\n';
};

Blockly.Python['flip_right'] = function(block) {
  return 'flipRight();\n';
};

Blockly.Python['land_then_takeoff'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'landThenTakeOff(' + duration + ');\n';
};

Blockly.Python['land'] = function(block) {
  return 'land();\n';
};

Blockly.Python['hover'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'hover(' + duration + ');\n';
};


Blockly.Python['loop'] = function(block) {
  var loopVar = Blockly.Python.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);
  var branch = Blockly.Python.statementToCode(block, 'DO').trim();
  var code = "\nfor (var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++) {\n";
  code += '  ' + branch + '\n';
  code += "}\n\n";
  return code;
};

Blockly.Python['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'false';
      branchCode = Blockly.Python.statementToCode(block, 'DO' + n) || '';
    code += (n == 0 ? 'if (' : '} else if (' ) + conditionCode + ') {\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
        Blockly.Python.PASS;
    code += '} else {\n' + branchCode + '}\n';
  }
  return code + '}';
};

Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
