import List from "../database/models/List";
import { listPayload } from "api/documents";

export async function addList(data : listPayload){
    const list = await List.create({
        original_creator : data.original_creator,
        name : data.name,
        themes : data.themes,
        write_rights : [data.original_creator]
    })
    return list
}

export async function deleteList(listId : string){
    const res = await List.remove({ _id : listId})
    return res
}