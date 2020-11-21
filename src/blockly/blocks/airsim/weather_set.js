Blockly.Blocks['weather_set'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "set weather: %1 and intensity %2 ",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "weather",
            "options":
              [["rain", "0"],
               ["snow", "2"],
               ["leaves", "4"],
               ["dust", "6"],
               ["fog", "7"]]
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