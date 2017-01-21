"use strict";
const events_1 = require("events");
const bencode = require('bencode');
const PACKET_SIZE = 16384;
class utMetadata extends events_1.EventEmitter {
    constructor(metadata_size, infoHash) {
        super();
        const self = this;
        self.metadata_size = metadata_size;
        self.infoHash = infoHash;
        self.piece_count = Math.ceil(metadata_size / PACKET_SIZE);
        self.next_piece = 0;
        self.pieces = Array.apply(null, Array(self.piece_count));
    }
    _message(payload) {
        const self = this;
        let str = payload.toString(), trailerIndex = str.indexOf('ee') + 2, dict = bencode.decode(str.substring(6, trailerIndex)), trailer = payload.slice(trailerIndex);
        switch (dict.msg_type) {
            case 0:
                break;
            case 1:
                if (dict.total_size > PACKET_SIZE)
                    return;
                else {
                    self.pieces[dict.piece] = trailer;
                    if (++self.next_piece === self.piece_count)
                        this.emit('finished_metadata', Buffer.concat(self.pieces));
                    else
                        this.emit('next', self.next_piece);
                }
                break;
            case 2:
                break;
            default:
        }
    }
}
exports.utMetadata = utMetadata;
class utPex extends events_1.EventEmitter {
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
exports.utPex = utPex;
function CanonicalPeerPriority() {
}
