import when from 'when';

export default class MidiAccess {

  constructor() {
    if (navigator.requestMIDIAccess) {
      this.enabled = true;
      navigator.requestMIDIAccess({
        sysex: false
      }).then((midiAccess) => {
        console.log('MIDI Connections Queried');
        let midi = midiAccess;

        let inputs = midi.inputs.values();
        this.controllers = [];
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          this.controllers.push(input);
        }
        return this.controllers;
      }, (e) => {      this.enable = false;
      return console.log('No access to MIDI devices or your browser doesn\'t fully support WebMIDI API.');

        this.enabled = false;
        return console.log('No access to MIDI devices or your browser doesn\'t fully support WebMIDI API.');
      });
    } else {
      console.log('Unable to find MIDI support for your browser.');
      return null;
    }
  }

  listMidiConnections() {
    if (!this.enabled) { return console.log('MIDI not supported'); }


  }

  getController(index) {
    if (!this.enabled) { return console.log('MIDI not supported'); }
    return this.controllers[index];
  }
}
/*
function onMIDISuccess(midiAccess) {
  console.log('midiAccess', midiAccess);
  var midi = midiAccess;

  var inputs = midi.inputs.values();
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(e) {
  console.log('No access to MIDI devices or your browser doesn\'t support WebMIDI API.  Please use WebMIDIAPIShim ' + e);
}

function onMIDIMessage(message) {
  var data = message.data;
  var channel = data[0] & 0xf;
  var type = data[0] & 0xf0;
  var note = data[1];
  var velocity = data[2];
  console.log(channel);
  switch (type) {
    case 144:
      noteOn(note, velocity);
      break;
    case 128:
      noteOff(note, velocity);
      break;
  }
}

function noteOn(midiNote, velocity) {
  color(midiNote, velocity);
}

function noteOff(midiNote, velocity) {
  color(midiNote, velocity);
}

function color(midiNote, velocity) {
  console.log('got message:', midiNote);
}

function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}*/