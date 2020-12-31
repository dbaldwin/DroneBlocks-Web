Blockly.Blocks['drive_train'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "set drive train: %1",
          "args0": [
            {
              "type": "field_dropdown",
              "name": "drive_train",
              "options":
                [["free", "free"],
                 ["forward", "forward"]]
            }
          ],
          "nextStatement": true,
          "previousStatement": true,
          "colour": "#2A9D8F"
        });
    }
  };