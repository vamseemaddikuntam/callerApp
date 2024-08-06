import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const WebRTCCall = ({ closeModal, phoneNumber }) => {
  const [stream, setStream] = useState(null);
  const peerConnection = useRef(new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  }));

  const startCall = async () => {
    const localStream = await mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);

    localStream.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream);
    });

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    // You would typically send the offer to the remote peer here
  };

  return (
    <View style={styles.container}>
      <Text>Calling {phoneNumber}</Text>
      {stream && (
        <RTCView streamURL={stream.toURL()} style={styles.stream} />
      )}
      <Button title="End Call" onPress={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    width: 200,
    height: 200,
  },
});

export default WebRTCCall;
