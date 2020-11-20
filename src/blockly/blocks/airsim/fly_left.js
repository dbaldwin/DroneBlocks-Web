Blockly.Blocks['fly_left'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "fly left %1 m/s for %2 seconds",
          "args0": [
            {
              "type": "input_value",
              "name": "yvelocity"
            },
            {
              "type": "input_value",
              "name": "duration"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };