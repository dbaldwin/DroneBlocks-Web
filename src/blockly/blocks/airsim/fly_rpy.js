Blockly.Blocks['fly_rpy'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "fly with roll: %1 pitch: %2 yaw: %3 degrees for %4 seconds",
          "args0": [
            {
              "type": "input_value",
              "name": "r"
            },
            {
              "type": "input_value",
              "name": "p"
            },
            {
              "type": "input_value",
              "name": "y"
            },
            {
              "type": "input_value",
              "name": "seconds"
            },
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };