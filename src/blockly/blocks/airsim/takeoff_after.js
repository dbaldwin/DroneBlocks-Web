Blockly.Blocks['takeoff_after'] = {
    /**
     * Show block.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit(
        {
          "message0": "takeoff after %1 seconds",
          "args0": [
            {
                "type": "input_value",
                "name": "delay"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#264653"
        });
    }
  };