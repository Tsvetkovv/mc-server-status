import {
  differenceInMilliseconds,
  formatDistance,
  formatDistanceToNow,
} from "date-fns";
import { escapeMessage } from "~/utils/escape-message";
import { CONFIG } from "./config";
import { McServer, PlayerStatus } from "./models/mc-server";
import { formatUrl } from "./utils/format-url";
import { getYearMonthHash } from "./parse-server-status";

function formatPlayerStatus(player: PlayerStatus) {
  if (player.isOnline) return `🟢 ${escapeMessage(player.name)}`;
  const formattedDuration = formatDistance(
    new Date(player.lastOnline),
    new Date(),
    {
      addSuffix: true,
    },
  );
  return `⚪ ${escapeMessage(player.name)} ~ ${formattedDuration}`;
}

function comparePlayers(a: PlayerStatus, b: PlayerStatus): number {
  if (!a.isOnline && !b.isOnline)
    return +new Date(b.lastOnline) - +new Date(a.lastOnline);
  if (a.isOnline && b.isOnline) return a.name.localeCompare(b.name);
  if (a.isOnline && !b.isOnline) return -1;
  return 1;
}

function getOnlineSection(online: PlayerStatus[]) {
  return [...online].sort(comparePlayers).map(formatPlayerStatus).join("\n");
}

function getOfflineSection(offline: PlayerStatus[]) {
  return [...offline]
    .filter((p) => {
      const diffInMilliseconds = differenceInMilliseconds(
        new Date(),
        new Date(p.lastOnline),
      );
      return diffInMilliseconds < CONFIG.thresholdToShowOfflinePlayersMs;
    })
    .sort(comparePlayers)
    .map(formatPlayerStatus)
    .join("\n");
}

function getPlayerListSection(server: McServer, showMaxOffline = 30) {
  const online = server.players.filter((p) => p.isOnline);
  const offline = server.players
    .filter((p) => !p.isOnline)
    .slice(0, Math.max(0, showMaxOffline - online.length));
  return `${[
    // TODO i18n
    [
      server.hasError ? "🛑" : "",
      `*${formatUrl(server)}*`,
      server.hasError
        ? "is offline"
        : `*${online.length}/${server.maxPlayers}*`,
    ]
      .filter(Boolean)
      .join(" "),
    getOnlineSection(online),
    getOfflineSection(offline),
  ]
    .filter(Boolean)
    .join("\n")}`;
}

export function getPlayersStat(
  players: PlayerStatus[],
  count = 3,
  isAllTime = false,
) {
  const currentYearMonth = getYearMonthHash();
  const medals = ["🥇", "🥈", "🥉"];
  return (
    players
      .map((player) => ({
        player,
        online:
          (isAllTime
            ? Object.values(player.onlineByMonth).reduce((sum, v) => sum + v, 0)
            : player.onlineByMonth[currentYearMonth]) || 0,
      }))
      .sort((a, b) => b.online - a.online)
      .slice(0, count)
      // TODO i18n pass locale to formatDistanceToNow
      .map((p, index) => {
        const medal = `${medals[index] || ` *${index + 1}.* `}`;
        const playerName = escapeMessage(p.player.name);
        const time = formatDistanceToNow(new Date(Date.now() - p.online));
        return `${medal} ${playerName} ~ ${time}`;
      })
      .join("\n")
  );
}

export function getPlayersStatSection(server: McServer) {
  return server.players.length > 0
    ? // TODO i18n
      ["*Top 3 online this month*", getPlayersStat(server.players)].join("\n")
    : undefined;
}

export function getServerStatusMessage(server: McServer) {
  if (!server) return "";
  const playerListSection = getPlayerListSection(server);
  const playersStatSection = getPlayersStatSection(server);
  return [playerListSection, playersStatSection]
    .filter((v) => v !== undefined)
    .join("\n\n");
}
