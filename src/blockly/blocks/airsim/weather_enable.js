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
              [["enable", "true"],
               ["disable", "false"]]
          }
        ],
        "nextStatement": true,
        "previousStatement": true,
        "colour": "#00688B"
      });
  }
};