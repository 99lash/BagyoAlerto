export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          isAllowed: true,
          data: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
        })
      },
      (error) => {
        resolve({
          isAllowed: false,
          data: error,
        })
      }
    );
  });
}