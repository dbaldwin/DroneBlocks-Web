Blockly.Blocks['weather_enable'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "%1 weather",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "enable",
            "options":
              [["enable", "1"],
               ["disable", "0"]]
          }
        ],
        "nextStatement": true,
        "previousStatement": true,
        "colour": "#00688B"
      });
  }
};