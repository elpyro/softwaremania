import { useBogotaTime } from '../../hooks/useUtils'

export function Clock() {
  const time = useBogotaTime()
  return <span>{time}</span>
}
