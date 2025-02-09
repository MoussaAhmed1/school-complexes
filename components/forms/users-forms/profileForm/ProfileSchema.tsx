import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";

const ProfileSchema = z.object({
  name : z.string().min(1, "Full name is required"),
  phone: validationRules.phone,
  avatarFile: validationRules.image.optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional()
});

export default ProfileSchema;