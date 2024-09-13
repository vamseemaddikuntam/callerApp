import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Dimensions } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import Peer from 'peerjs';
import InCallManager from 'react-native-incall-manager';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const CallScreen = ({ navigation, route }) => {
  const { callType, phoneNumber, profileImage } = route.params;
  const [peer, setPeer] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(callType === 'video');

  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    const initializePeer = () => {
      try {
        const newPeer = new Peer();
        peerRef.current = newPeer;
        
        newPeer.on('open', id => {
            console.log('Peer ID:', id); // Log the Peer ID
            setPeer(newPeer); // Set the peer instance in state
          });

        newPeer.on('call', async call => {
          console.log('Incoming call:', call);
          try {
            const stream = await mediaDevices.getUserMedia({
              audio: true,
              video: videoEnabled,
            });
            localStreamRef.current = stream;
            setLocalStream(stream);
            call.answer(stream);

            call.on('stream', remoteStream => {
              console.log('Remote stream received:', remoteStream);
              remoteStreamRef.current = remoteStream;
              setRemoteStream(remoteStream);
            });

            call.on('error', error => {
              console.error('Call error:', error);
              endCall();
            });

            call.on('close', () => {
              console.log('Call ended');
              endCall();
            });
          } catch (error) {
            console.error('Error getting user media:', error);
          }
        });

        newPeer.on('error', error => {
          console.error('Peer error:', error);
        });

      } catch (error) {
        console.error('Error initializing Peer:', error);
      }
    };

    const setupCall = async () => {
      try {
        if (peerRef.current && phoneNumber) {
          const stream = await mediaDevices.getUserMedia({
            audio: true,
            video: videoEnabled,
          });
          localStreamRef.current = stream;
          setLocalStream(stream);

          const call = peerRef.current.call(phoneNumber, stream);
          console.log('Call object:', call);

          if (call) {
            call.on('stream', remoteStream => {
              console.log('Remote stream received:', remoteStream);
              remoteStreamRef.current = remoteStream;
              setRemoteStream(remoteStream);
            });

            call.on('error', error => {
              console.error('Call error:', error);
              endCall();
            });

            call.on('close', () => {
              console.log('Call ended');
              endCall();
            });
          } else {
            console.error('Failed to initiate call: call object is undefined');
          }
        }
      } catch (error) {
        console.error('Error setting up call:', error);
      }
    };

    initializePeer();
    setupCall();

    return () => {
      if (peerRef.current) {
        peerRef.current.disconnect();
        peerRef.current.destroy();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [phoneNumber, videoEnabled]);

  useEffect(() => {
    const toggleVideoTrack = () => {
      if (localStreamRef.current) {
        const videoTrack = localStreamRef.current.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.enabled = videoEnabled;
        }
      }
    };

    toggleVideoTrack();
  }, [videoEnabled]);

  const endCall = () => {
    InCallManager.stop();
    navigation.goBack(); // Navigate back to the previous screen
  };

  const toggleVideo = () => {
    setVideoEnabled(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {profileImage ? (
          <Ionicons name="person-circle" size={80} color="#fff" />
        ) : (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}
        <Text style={styles.callTypeText}>
          {callType === 'video' ? 'Video Call' : 'Audio Call'}
        </Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <View style={styles.callContainer}>
        {remoteStream ? (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit='cover'
          />
        ) : (
          <Text style={styles.connectingText}>Connecting...</Text>
        )}
        {localStream && callType === 'video' && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
            objectFit='cover'
          />
        )}
      </View>
      <View style={styles.controls}>
        {callType === 'video' && (
          <Button
            title={videoEnabled ? 'Disable Video' : 'Enable Video'}
            onPress={toggleVideo}
          />
        )}
        <TouchableOpacity onPress={endCall} style={styles.endCallButton}>
          <Text style={styles.endCallText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  callTypeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  phoneNumber: {
    color: '#ccc',
    fontSize: 16,
  },
  callContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideo: {
    width: width,
    height: height * 0.75, // Adjust to your needs
  },
  localVideo: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  connectingText: {
    color: '#fff',
  },
  controls: {
    marginBottom: 30,
  },
  endCallButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
  },
  endCallText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CallScreen;


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
// import { RTCView, mediaDevices } from 'react-native-webrtc';
// import Peer from 'peerjs';

// const CallScreen = ({ navigation, route }) => {
//   const { callType, phoneNumber, profileImage } = route.params;

//   const [peer, setPeer] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [videoEnabled, setVideoEnabled] = useState(callType === 'video');
//   const [incomingCall, setIncomingCall] = useState(false);
//   const [callerName, setCallerName] = useState('');
//   const [callId, setCallId] = useState(null);

//   const localStreamRef = useRef(null);
//   const remoteStreamRef = useRef(null);

//   useEffect(() => {
//     const initializePeer = () => {
//       const newPeer = new Peer();
//       newPeer.on('open', id => {
//         setPeer(id);
//         console.log('Peer ID:', id);
//       });

//       newPeer.on('call', async call => {
//         setIncomingCall(true);
//         setCallId(call.peer);
//         const stream = await mediaDevices.getUserMedia({ audio: true, video: videoEnabled });
//         setLocalStream(stream);
//         call.answer(stream);

//         call.on('stream', remoteStream => {
//           setRemoteStream(remoteStream);
//         });
//       });

//       return newPeer;
//     };

//     const setupCall = async () => {
//       if (peer && phoneNumber) {
//         const stream = await mediaDevices.getUserMedia({ audio: true, video: videoEnabled });
//         setLocalStream(stream);
//         const call = peer.call(phoneNumber, stream);
//         call.on('stream', remoteStream => {
//           setRemoteStream(remoteStream);
//         });
//       }
//     };

//     const newPeer = initializePeer();
//     setupCall();

//     return () => {
//       if (newPeer) {
//         newPeer.disconnect();
//         newPeer.destroy();
//       }
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [phoneNumber]);

//   useEffect(() => {
//     if (localStream) {
//       const videoTrack = localStream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = videoEnabled;
//       }
//     }
//   }, [videoEnabled, localStream]);

//   const endCall = () => {
//     if (peer) {
//       peer.disconnect();
//       peer.destroy();
//     }
//     if (localStream) {
//       localStream.getTracks().forEach(track => track.stop());
//     }
//     navigation.goBack();
//   };

//   const toggleVideo = () => {
//     setVideoEnabled(prev => !prev);
//   };

//   const answerCall = async () => {
//     try {
//       const stream = await mediaDevices.getUserMedia({ audio: true, video: videoEnabled });
//       setLocalStream(stream);
//       if (peer && callId) {
//         const call = peer.call(callId, stream);
//         call.on('stream', remoteStream => {
//           setRemoteStream(remoteStream);
//         });
//         setIncomingCall(false);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to answer the call.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {profileImage ? (
//           <Text style={styles.profileImage}>{profileImage}</Text>
//         ) : (
//           <Text style={styles.profileImage}>No Image</Text>
//         )}
//         <Text style={styles.callTypeText}>{callType === 'video' ? 'Video Call' : 'Audio Call'}</Text>
//         <Text style={styles.phoneNumber}>{phoneNumber}</Text>
//       </View>
//       <View style={styles.callContainer}>
//         {remoteStream ? (
//           <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />
//         ) : (
//           <Text style={styles.connectingText}>Connecting...</Text>
//         )}
//         {localStream && callType === 'video' && (
//           <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//         )}
//       </View>
//       <View style={styles.controls}>
//         {callType === 'video' && (
//           <Button
//             title={videoEnabled ? 'Disable Video' : 'Enable Video'}
//             onPress={toggleVideo}
//           />
//         )}
//         {incomingCall ? (
//           <View style={styles.incomingCall}>
//             <Text style={styles.incomingCallText}>Incoming Call from {callerName}</Text>
//             <Button title="Answer" onPress={answerCall} />
//           </View>
//         ) : (
//           <TouchableOpacity onPress={endCall} style={styles.endCallButton}>
//             <Text style={styles.endCallText}>End Call</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     lineHeight: 80,
//     color: '#000',
//   },
//   callTypeText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   phoneNumber: {
//     color: '#ccc',
//     fontSize: 16,
//   },
//   callContainer: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   remoteVideo: {
//     width: '100%',
//     height: '80%',
//   },
//   localVideo: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     borderWidth: 1,
//     borderColor: 'white',
//   },
//   connectingText: {
//     color: '#fff',
//   },
//   controls: {
//     marginBottom: 30,
//   },
//   endCallButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 50,
//   },
//   endCallText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   incomingCall: {
//     alignItems: 'center',
//   },
//   incomingCallText: {
//     color: '#fff',
//     marginBottom: 10,
//   },
// });

// export default CallScreen;
