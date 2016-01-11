export default class MidiAccess {

  constructor(onMidiMessage, controller) {
    console.log(onMidiMessage);
    if (navigator.requestMIDIAccess) {
      this.enabled = true;
      this.controllers = [];

      navigator.requestMIDIAccess({
        sysex: false
      }).then(
        (midiAccess) => {

          console.log('MIDI Connections Queried');
          if (controller >= 0) {
            console.log('Listening on MIDI Device ' + controller);
          } else {
            console.log('Listening on all MIDI Devices');
          }

          let midi = midiAccess;
          let inputs = midi.inputs.values();
          let i = 0;
          for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            console.log(i, controller)

            input.value.onmidimessage = onMidiMessage;

            console.log(input.value);
            i += 1;
          }
        },
        (e) => {
          console.log('No access to MIDI devices or your browser doesn\'t fully support WebMIDI API.');
        }
      );
    } else {
      console.log('Unable to find MIDI support for your browser.');
      return null;
    }
  }
}
