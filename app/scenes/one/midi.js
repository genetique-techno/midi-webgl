
export default function(message) {
  console.log('message received');
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
};

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