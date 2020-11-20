Blockly.Blocks['weather_set'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "set weather %1 and intensity %2 ",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "weather",
            "options":
              [["Rain", "0"],
               ["Snow", "2"],
               ["Leaves", "4"],
               ["Dust", "6"],
               ["Fog", "7"]]
          },
          {
            "type": "input_value",
            "name": "intensity"
          }
        ],
        "nextStatement": true,
        "previousStatement": true,
        "colour": "#00688B"
      });
  }
};