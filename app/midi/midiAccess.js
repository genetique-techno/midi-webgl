export default class MidiAccess {

  constructor() {
    if (navigator.requestMIDIAccess) {
      this.enabled = true;
      this.controllers = [];

      navigator.requestMIDIAccess({
        sysex: false
      }).then(
        (midiAccess) => {

          let midi = midiAccess;
          let inputs = midi.inputs.values();
          for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this._onMidiMessage;
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

  _onMidiMessage(message) {
    let data = message.data;
    let channel = data[0] & 0xf;
    let type = data[0] & 0xf0;
    let note = data[1];
    let velocity = data[2];
    let noteEvent = new CustomEvent('__note', { detail: { channel, type, note, velocity }});
    window.dispatchEvent(noteEvent);
  }
}
