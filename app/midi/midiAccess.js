// Midi Web API test

/*export class MidiAccess {

  constructor() {

  }

  controllers() {

  }

  getController(num) {

  }
}*/

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  console.log('Unable to find MIDI support for your browser.');
}

var body = document.getElementsByTagName('body')[0];

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
}