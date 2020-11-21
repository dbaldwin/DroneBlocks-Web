Blockly.Blocks['fly_to_position'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "fly to position: x %1 y %2 z %3 meters",
          "args0": [
            {
              "type": "input_value",
              "name": "xposition"
            },
            {
              "type": "input_value",
              "name": "yposition"
            },
            {
              "type": "input_value",
              "name": "zposition"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };