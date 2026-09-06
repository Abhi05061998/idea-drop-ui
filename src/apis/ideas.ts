import type { Idea } from '../types'
import api from '../lib/axios'
export const fetchIdeas = async (limit?:number): Promise<Idea[]> => {
  const res = await api.get('/ideas',{
    params:limit?{_limit:limit}:{}
  })
  return res.data
}
export const fetchIdeaById=async (ideaId: string):Promise<Idea> => {
   const res = await api.get(`/ideas/${ideaId}`)
   return res.data
}
export const createIdea=async(newIdea:{
  title:string,
  summary:string,
  description:string,
  tags:string[]
}):Promise<Idea>=>{
  const res = await api.post("/ideas",{
    ...newIdea,
    createdAt:new Date().toISOString()
  })
  return res.data
}
export const deleteIdea=async(ideaId:string):Promise<void>=>{
  const res = await api.delete(`/ideas/${ideaId}`)
  return res.data
}
export const updateIdea=async(ideaId:string,updatedIdea:{
  title:string,
  summary:string,
  description:string,
  tags:string[]
}):Promise<Idea>=>{
  const updatedPayload = {
    ...updatedIdea,
    "lastUpdated":new Date().toISOString()
  }
  const res = await api.put(`/ideas/${ideaId}`,updatedPayload)
  return res.data
}
  


