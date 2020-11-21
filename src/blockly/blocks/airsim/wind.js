Blockly.Blocks['wind'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "set wind: north %1 east %2 down %3 m/s",
          "args0": [
            {
              "type": "input_value",
              "name": "north",
            },
            {
              "type": "input_value",
              "name": "east"
            },
            {
              "type": "input_value",
              "name": "down"
            }
          ],
          "nextStatement": true,
          "previousStatement": true,
          "colour": "#00688B"
        });
    }
  };