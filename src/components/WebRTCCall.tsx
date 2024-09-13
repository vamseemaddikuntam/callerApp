// WebRTCCall.js
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, Text, ActivityIndicator} from 'react-native';
import {RTCView, mediaDevices} from 'react-native-webrtc';
import Peer from 'peerjs';
import InCallManager from 'react-native-incall-manager';

const WebRTCCall = ({closeModal, phoneNumber, callType}) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState('');
  const [remoteStream, setRemoteStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePeer = () => {
      const newPeer = new Peer(); // Create a new PeerJS instance
      setPeer(newPeer);

      newPeer.on('open', id => {
        setPeerId(id);
        console.log('Peer ID:', id);
        setLoading(false);
      });

      newPeer.on('call', async call => {
        const localStream = await mediaDevices.getUserMedia({
          audio: true,
          video: callType === 'video', // Enable video only for video calls
        });
        setStream(localStream);
        call.answer(localStream); // Answer the call with the local stream
        call.on('stream', remoteStream => {
          setRemoteStream(remoteStream); // Set the remote stream
        });
      });

      return newPeer;
    };

    const setupCall = async () => {
      if (peer && phoneNumber) {
        const localStream = await mediaDevices.getUserMedia({
          audio: true,
          video: callType === 'video', // Enable video only for video calls
        });
        setStream(localStream);

        const call = peer.call(phoneNumber, localStream); // Initiate the call
        call.on('stream', remoteStream => {
          setRemoteStream(remoteStream); // Set the remote stream
        });
      }
    };

    const newPeer = initializePeer();
    setupCall();

    return () => {
      newPeer.disconnect();
      newPeer.destroy();
      stream && stream.getTracks().forEach(track => track.stop());
    };
  }, [callType, phoneNumber]);

  const endCall = () => {
    InCallManager.stop();
    closeModal();
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <Text>LOadinggggg</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <View style={styles.callContainer}>
          {remoteStream && (
            <>
              <Text>Remote</Text>
              <RTCView
                streamURL={remoteStream.toURL()}
                style={styles.remoteVideo}
              />
            </>
          )}
          {stream && (
            <>
              <Text>LOcal</Text>
              <RTCView streamURL={stream.toURL()} style={styles.localVideo} />
            </>
          )}
          <Button title="End Call" onPress={endCall} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideo: {
    width: '100%',
    height: '80%',
  },
  localVideo: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default WebRTCCall;
