import { BigInt } from '@graphprotocol/graph-ts'

import { DailyClaimed } from '../generated/Daily/Daily'
import { DailyClaimedHistory, DailyClaimedStat } from '../generated/schema'

export function handleDailyClaimed(event: DailyClaimed): void {
  let stat = DailyClaimedStat.load('today')
  if (stat == null) {
    stat = new DailyClaimedStat('today')
    stat.day = event.params.day
    stat.amount = BigInt.fromI32(0)
    stat.count = BigInt.fromI32(0)
  }

  const currentDay = event.params.day
  if (!stat.day.equals(currentDay)) {
    stat.day = currentDay
    stat.amount = BigInt.fromI32(0)
    stat.count = BigInt.fromI32(0)
  }

  stat.amount = stat.amount.plus(event.params.amount)
  stat.count = stat.count.plus(BigInt.fromI32(1))

  const ranking = stat.count

  const history = new DailyClaimedHistory(event.params.user.toHexString())
  history.day = currentDay
  history.amount = event.params.amount
  history.ranking = ranking

  stat.save()
  history.save()
}
