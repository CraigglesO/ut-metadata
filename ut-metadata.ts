import { EventEmitter } from 'events';

const bencode     = require('bencode');
const PACKET_SIZE = 16384;

// BEP_0009
class utMetadata extends EventEmitter {
  metadata_size: number
  infoHash:      string
  piece_count:   number
  pieces:        Array<Buffer>
  constructor(metadata_size: number, infoHash: string) {
    super();
    const self = this;

    self.metadata_size = metadata_size;
    self.infoHash      = infoHash;
    self.piece_count   = Math.ceil(metadata_size / PACKET_SIZE);
    self.pieces        = Array.apply(null, Array(self.piece_count));
  }

  _message(payload: Buffer) {
    const self       = this;
    let str          = payload.toString(),
        trailerIndex = str.indexOf('ee') + 2,
        dict         = bencode.decode(str.substring(6, trailerIndex)),
        trailer      = payload.slice(trailerIndex)

    switch(dict.msg_type) {
      case 0:
        // REQUEST {'msg_type': 0, 'piece': 0}
        break;
      case 1:
        // DATA {'msg_type': 1, 'piece': 0, 'total_size': 3425}
        if (dict.total_size > PACKET_SIZE)
          return;
        else {
          self.piece_count--;
          self.pieces[dict.piece] = trailer;

          if (!self.piece_count) {
            // Emit finished hash:
            this.emit('finished_metadata', Buffer.concat(self.pieces));
          }
        }
        break;
      case 2:
        // REJECT {'msg_type': 2, 'piece': 0}
        break;
      default:

    }
  }
}

// BEP_0011
class utPex extends EventEmitter {
  constructor() {
    super();
  }

  start() {

  }

  stop() {

  }

  addPeer() {

  }

  removePeer() {

  }
}

// BEP_0040
function CanonicalPeerPriority () {

}

export { utMetadata }
