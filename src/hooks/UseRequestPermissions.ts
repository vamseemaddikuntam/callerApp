// hooks/useRequestPermissions.ts

import {useState, useCallback} from 'react';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const useRequestPermissions = () => {
  const [permissionsStatus, setPermissionsStatus] = useState({});

  const requestPermissions = useCallback(async () => {
    const permissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      //   PERMISSIONS.IOS.CAMERA,
      //   PERMISSIONS.IOS.MICROPHONE,
    ];

    try {
      const statuses = await Promise.all(
        permissions.map(permission => request(permission)),
      );
      const allGranted = statuses.every(status => status === RESULTS.GRANTED);
      setPermissionsStatus(statuses);
      return allGranted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }, []);

  return {requestPermissions, permissionsStatus};
};

export default useRequestPermissions;
