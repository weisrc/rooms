import { serve } from "https://deno.land/std/http/server.ts";

const rooms: Record<string, Set<WebSocket>> = {};

const channel = new BroadcastChannel("");

channel.onmessage = ({ data: [url, data] }) => {
	rooms[url]?.forEach((peer) => peer.send(data));
};

function handle(req: Request): Response {
	if (req.headers.get("upgrade") != "websocket") {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(req);

	const peers = (rooms[req.url] ??= new Set());

	socket.onmessage = ({ data }) => {
		for (const peer of peers) {
			if (peer === socket) continue;
			peer.send(data);
		}
		channel.postMessage([req.url, data]);
	};

	socket.onopen = () => peers.add(socket);
	socket.onclose = () => peers.delete(socket);

	return response;
}

serve(handle, { port: 8081 });
