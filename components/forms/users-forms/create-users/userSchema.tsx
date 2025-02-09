import validationRules from "@/utils/zodValidationRules";
import * as z from "zod";
import { zfd } from "zod-form-data";
const UserSchema = z.object({
  name : z.string().min(1, "Full name is required"),
  phone: validationRules.phone.optional(),
  city_id: z.string().optional(),
  avatarFile: z.union([
    zfd
    .file()
    .refine((file) => file.size < 10000000, {
      message: "File can't be bigger than 10MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg", "image", 'image/svg+xml',].includes(file.type),
      {
        message: "File format must be either jpg, jpeg , svg, or png.",
      }
    ),
    z.string().refine((url) => {
      try {
        const { pathname } = new URL(url);
        const extension = pathname.split('.').pop();
        return ['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(extension?.toLowerCase() ?? '');
      } catch (error) {
        return false;
      }
    }, {
      message: 'String must be a valid image URL (jpeg, png, gif)',
    })
  ]).optional(),
  role: z.enum(["PARENT", "DRIVER", "SCHOOL", "SECURITY","ADMIN","SCHOOL_ADMIN"]),
  academic_stage: z.enum(["Kindergarten", "Primary", "Intermediate", "Secondary"]).optional(),
  school_id: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),
});

export default UserSchema;