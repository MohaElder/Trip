import type { RawDraftContentState } from "draft-js"

export type Note = {
    id: string,
    placeholder: string,
    data: RawDraftContentState
}