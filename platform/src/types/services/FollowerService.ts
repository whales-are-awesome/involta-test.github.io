import { IPaginationParams } from '@/types/api'

interface IFollower {
    address: string
    name?: string
    votingPower?: number
}

export {
    IFollower,
    IPaginationParams
}
