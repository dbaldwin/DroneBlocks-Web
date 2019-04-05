Blockly.Blocks['fly_up'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": Blockly.Msg.NAVIGATION_FLY_UP + " %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "distance"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
              [["in", "in"],
               ["cm", "cm"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};