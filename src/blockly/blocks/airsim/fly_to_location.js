Blockly.Blocks['fly_to_location'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "fly to location: x %1 y %2 z %3 meters",
          "args0": [
            {
              "type": "input_value",
              "name": "x"
            },
            {
              "type": "input_value",
              "name": "y"
            },
            {
              "type": "input_value",
              "name": "z"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };