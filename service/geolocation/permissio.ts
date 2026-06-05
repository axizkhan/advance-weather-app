export async function geoLocationPermissionState() {
  if (!navigator.permissions) {
    return "unsupported";
  }

  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    return permission.state;
  } catch (err) {
    return "unsupported";
  }
}
