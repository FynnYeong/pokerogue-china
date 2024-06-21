import { SimpleTranslationEntries } from "#app/interfaces/locales";

/**
 * The menu namespace holds most miscellaneous text that isn't directly part of the game's
 * contents or directly related to Pokemon data. This includes menu navigation, settings,
 * account interactions, descriptive text, etc.
 */
export const menu: SimpleTranslationEntries = {
  "cancel": "Cancel",
  "continue": "Continue",
  "dailyRun": "Daily Run (Beta)",
  "loadGame": "Load Game",
  "newGame": "New Game",
  "settings": "Settings",
  "selectGameMode": "Select a game mode.",
  "logInOrCreateAccount": "Log in or create an account to start. No email required!",
  "username": "Username",
  "password": "Password",
  "login": "Login",
  "register": "Register",
  "emptyUsername": "Username must not be empty",
  "invalidLoginUsername": "The provided username is invalid",
  "invalidRegisterUsername": "Username must only contain letters, numbers, or underscores",
  "invalidLoginPassword": "The provided password is invalid",
  "invalidRegisterPassword": "Password must be 6 characters or longer",
  "usernameAlreadyUsed": "The provided username is already in use",
  "accountNonExistent": "The provided user does not exist",
  "unmatchingPassword": "The provided password does not match",
  "passwordNotMatchingConfirmPassword": "Password must match confirm password",
  "confirmPassword": "Confirm Password",
  "registrationAgeWarning": "By registering, you confirm you are of 13 years of age or older.",
  "backToLogin": "Back to Login",
  "failedToLoadSaveData": "Failed to load save data. Please reload the page.\nIf this persists, please check #announcements in Discord.",
  "sessionSuccess": "Session loaded successfully.",
  "failedToLoadSession": "Your session data could not be loaded.\nIt may be corrupted.",
  "boyOrGirl": "Are you a boy or a girl?",
  "boy": "Boy",
  "girl": "Girl",
  "selectServerAddress": "Please select your server",
  "serverAddress1": "Official Server",
  "serverAddress2": "China Server",
  "serverAddress3": "My computer (offline)",
  "evolving": "What?\n{{pokemonName}} is evolving!",
  "stoppedEvolving": "{{pokemonName}} stopped evolving.",
  "pauseEvolutionsQuestion": "Would you like to pause evolutions for {{pokemonName}}?\nEvolutions can be re-enabled from the party screen.",
  "evolutionsPaused": "Evolutions have been paused for {{pokemonName}}.",
  "evolutionDone": "Congratulations!\nYour {{pokemonName}} evolved into {{evolvedPokemonName}}!",
  "dailyRankings": "Daily Rankings",
  "weeklyRankings": "Weekly Rankings",
  "noRankings": "No Rankings",
  "positionIcon": "#",
  "usernameScoreboard": "Username",
  "score": "Score",
  "wave": "Wave",
  "loading": "Loading…",
  "loadingAsset": "Loading asset: {{assetName}}",
  "playersOnline": "Players Online",
  "yes":"Yes",
  "no":"No",
  "disclaimer": "DISCLAIMER",
  "disclaimerDescription": "This game is an unfinished product; it might have playability issues (including the potential loss of save data),\n change without notice, and may or may not be updated further or completed.",
} as const;
