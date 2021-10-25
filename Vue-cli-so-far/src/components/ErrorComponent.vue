<template>
  <!-- component shows when the user needs to relogin -->
  <!-- either, they reloaded the authenticated page unnecessarily (removed for now) -->
  <!-- or the auth key is no longer valid, in which case need to create a -->
  <!-- function that checks for the date in which user lands, then counts for 55min (5min buffer) -->
  <!-- before throwing the error to reauthenticate -->
  <div class="py-3">
    <p>Error 401: Authentication Error. Please try re-authenticating.</p>
  </div>
  <button class="btn btn-success bgdarkgreen" @click="redirecting">
    Re-authenticate
  </button>
</template>

<script>
import { redirecting } from "@/components/redirect.js";

export default {
  name: "ErrorComponent",
  setup() {
    const possibleErrors = [
      "Error 401: Authentication Error. Please try re-authenticating.",
      "Error 401: Authentication Error. Your spotify access token has expired, please re-log.",
    ];
    return { redirecting, possibleErrors };
  },
};
</script>

<style scoped></style>
