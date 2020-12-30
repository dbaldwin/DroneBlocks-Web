Blockly.Blocks['coordinate_system'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "set coordinate system: %1",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "coordinate_system",
              "options":
                [["world", "world"],
                 ["local", "local"]]
            }
          ],
          "nextStatement": true,
          "previousStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };