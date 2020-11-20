Blockly.Blocks['fly_up'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "fly up %1 m/s for %2 seconds",
          "args0": [
            {
              "type": "input_value",
              "name": "zvelocity"
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