import { Role } from "./users";

export interface Notification {
  id: string;
  title: string;
  text: string;
  url: string;
  type: string;
  is_read: boolean;
  seen_at: any;
  created_at: string;
  role: any;
  }
  
  export interface SingleNotification {
    id: string
    title_ar: string
    title_en: string
    text_ar: string
    text_en: string
    url: string
    type: string
    is_read: boolean
    seen_at: any
    created_at: string
    role: Role
    users?: User[]
  }
  
  export interface User {
    id: string
    avatar: string
    name: string
  }
  