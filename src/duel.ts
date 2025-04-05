import {
  Cancelled as CancelledEvent,
  Created as CreatedEvent,
  Joined as JoinedEvent,
  Resolved as ResolvedEvent,
} from '../generated/Duel/Duel'
import { Game } from '../generated/schema'

export function handleCreated(event: CreatedEvent): void {
  const gameId = event.params.gameId.toHexString()

  const game = new Game(gameId)
  game.player1 = event.params.player1.toHexString()
  game.player2 = ''
  game.resolver = event.params.resolver.toHexString()
  game.token = event.params.token.toHexString()
  game.amount = event.params.amount
  game.fee = event.params.fee
  game.settled = false
  game.winner = ''
  game.cancelled = false
  game.createdAt = event.block.timestamp

  game.save()
}

export function handleJoined(event: JoinedEvent): void {
  const gameId = event.params.gameId.toHexString()

  const game = Game.load(gameId)
  if (game) {
    game.player2 = event.params.player2.toHexString()
    game.save()
  }
}

export function handleResolved(event: ResolvedEvent): void {
  const gameId = event.params.gameId.toHexString()

  const game = Game.load(gameId)
  if (game) {
    game.settled = true
    game.winner = event.params.winner.toHexString()
    game.save()
  }
}

export function handleCancelled(event: CancelledEvent): void {
  const gameId = event.params.gameId.toHexString()

  const game = Game.load(gameId)
  if (game) {
    game.settled = true
    game.cancelled = true
    game.save()
  }
}
