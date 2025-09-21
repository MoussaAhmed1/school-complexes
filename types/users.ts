export interface ILogedUser {
  id: string;
  name: string;
  account: string;
  avatar: string;
  username: string;
  email: string;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  birth_date: string;
  gender: string;
  language: string;
  fcm_token: any;
  access_token_complexes: string;
}

export interface IUser {
  pending_requests: number;
  confirmed_requests: number;
  completed_requests: number;
  city_id: any;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gender: "male" | "female";
  phone: string;
  created_at: string;
  familyMembersCount: number;
  watchUsersCount: number;
  school?: School;
  academic_stage?: "Kindergarten" | "Primary" | "Intermediate" | "Secondary" | undefined;
}

export interface School {
  id: string;
  name: string;
  avatar: string;
  city_code: string;
  city_id: string;
  academic_stage: "Kindergarten" | "Primary" | "Intermediate" | "Secondary" ;
}

export interface AccountProfile {
  premessions: string[];
  id: string;
  account: string;
  first_name: string;
  last_name: string;
  avatar: string;
  username: string;
  email: any;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  birth_date: string;
  gender: "male" | "female";
  language: string;
}

export interface ClientAddtionalInfo {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
}

export enum Role {
  "parents" = "PARENT",
  "drivers" = "DRIVER",
  "schools" = "SCHOOL",
  "security" = "SECURITY",
  "admins" = "ADMIN",
  "school_admin" = "SUPERVISOR",

}

export interface FamilyMember {
  id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  kinship: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

enum Kinship {
  Parent = "Parent",
  Child = "Child",
  Sibling = "Sibling",
  Spouse = "Spouse",
  Grandparent = "Grandparent",
  Grandchild = "Grandchild",
  UncleAunt = "UncleAunt",
  NieceNephew = "NieceNephew",
  Cousin = "Cousin",
  Other = "Other",
}

export default Kinship;

export interface ICity {
  id: string;
  name: string;
  code: string;
}
