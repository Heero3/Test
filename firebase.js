import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLObx3XVJnqaKnEpZM6MQWWGMTE88q-BM",
  authDomain: "mini-games-f98a5.firebaseapp.com",
  projectId: "mini-games-f98a5",
  storageBucket: "mini-games-f98a5.firebasestorage.app",
  messagingSenderId: "394936593659",
  appId: "1:394936593659:web:802e32df24b9f70badd45e",
  measurementId: "G-K7LGZGSQTS",
  site: "mini-games-f98a5-eedc9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Analytics events
export function trackGameStart() {
  logEvent(analytics, 'game_start');
}

export function trackMove(player, position) {
  logEvent(analytics, 'move_made', {
    player,
    position
  });
}

export function trackGameResult(result) {
  logEvent(analytics, 'game_result', { result });
}

export function trackRestart() {
  logEvent(analytics, 'game_restart');
}

export { analytics };
