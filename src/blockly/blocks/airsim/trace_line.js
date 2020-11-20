Blockly.Blocks['trace_line'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "set trace line color %1 and width %2 ",
        "args0": [
          {
            "type": "field_colour",
            "name": "color",
            "colour": "#00ff00",
          },
          {
            "type": "input_value",
            "name": "width"
          }
        ],
        "nextStatement": true,
        "previousStatement": true,
        "colour": "#00688B"
      });
  }
};