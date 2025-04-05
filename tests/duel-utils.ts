import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Cancelled,
  Created,
  Joined,
  OwnershipTransferred,
  Resolved
} from "../generated/Duel/Duel"

export function createCancelledEvent(gameId: Bytes): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )

  return cancelledEvent
}

export function createCreatedEvent(
  gameId: Bytes,
  player1: Address,
  resolver: Address,
  token: Address,
  amount: BigInt,
  fee: BigInt
): Created {
  let createdEvent = changetype<Created>(newMockEvent())

  createdEvent.parameters = new Array()

  createdEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("player1", ethereum.Value.fromAddress(player1))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("resolver", ethereum.Value.fromAddress(resolver))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return createdEvent
}

export function createJoinedEvent(gameId: Bytes, player2: Address): Joined {
  let joinedEvent = changetype<Joined>(newMockEvent())

  joinedEvent.parameters = new Array()

  joinedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  joinedEvent.parameters.push(
    new ethereum.EventParam("player2", ethereum.Value.fromAddress(player2))
  )

  return joinedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createResolvedEvent(gameId: Bytes, winner: Address): Resolved {
  let resolvedEvent = changetype<Resolved>(newMockEvent())

  resolvedEvent.parameters = new Array()

  resolvedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromFixedBytes(gameId))
  )
  resolvedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )

  return resolvedEvent
}
