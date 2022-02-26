# Rooms

Basic Deno WebSocket server for WebRTC signaling or simply "P2P" communication.

[![image][deploy-img]][deploy-url]

[deploy-img]: https://user-images.githubusercontent.com/23035000/116934239-b0d4a400-ac32-11eb-83f6-0c4119d59fa8.png

[deploy-url]: https://dash.deno.com/new?url=https://deno.land/x/rooms/mod.ts

Or use `wss://rooms.deno.dev`

## Usage

```ts
const roomId = "my room id"
const ws = new WebSocket("wss://rooms.deno.dev/" + roomId);
// broadcast message to all peers in the room except the sender.
ws.send("Hello world")
// receive broadcasts
ws.onmessage = console.log
```

> It is possible to not add a room ID, but it is not suggested.

- This can be used for WebRTC signaling without a server.
- Simple room chat.

## Rate Limiting

Right now, there are no rate limiting policies. However...

## DO NOT

- D.O.S.
- Or do anything stupid...
- Send lots of data. (use WebRTC)

## Avoid

- Using this in production. (I might shut it down)

## Limitations (Deno Deploy)

- May not receive broadcasts from different regions of the world. (Will soon use the BroadcastChannel API of Deno Deploy to fix this.)

## License

MIT