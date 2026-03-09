import { z } from "zod";

// --- Auth Schemas ---
export const LoginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const RegisterSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// --- Workspace Schemas ---
export const CreateWorkspaceSchema = z.object({
    name: z.string().min(2, "Nome da empresa inválido"),
    slug: z.string().min(2, "Slug inválido").regex(/^[a-z0-0-]+$/, "Apenas letras minúsculas, números e hifens"),
});

// --- Kanban Schemas ---
export const KanbanTaskSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    workspaceId: z.string(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreateWorkspaceInput = z.infer<typeof CreateWorkspaceSchema>;
export type KanbanTaskInput = z.infer<typeof KanbanTaskSchema>;
