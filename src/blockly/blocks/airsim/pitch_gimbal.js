Blockly.Blocks['pitch_gimbal'] = {
    /**
     * Show block.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit(
        {
          "message0": "pitch gimbal to %1 degrees",
          "args0": [
            {
              "type": "input_value",
              "name": "angle"
            }
          ],
          "nextStatement": true,
          "previousStatement": true,
          "colour": "#64c2d9"
        });
    }
  };