Blockly.Blocks['rotate_yaw_rate'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "yaw %1 degrees for %2 seconds",
          "args0": [
            {
              "type": "input_value",
              "name": "angle"
            },
            {
              "type": "input_value",
              "name": "seconds"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };