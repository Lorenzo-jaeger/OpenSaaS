"use client";

import React from "react";

interface PermissionGuardProps {
    permission?: string;
    role?: string;
    sector?: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * PermissionGuard Component
 * 
 * Envolve componentes que requerem permissões específicas.
 * Atualmente funciona como um placeholder premium que será conectado ao 
 * backend/contexto de permissões por setores.
 */
export function PermissionGuard({
    permission,
    role,
    sector,
    children,
    fallback = null
}: PermissionGuardProps) {
    // TODO: Implementar lógica real de verificação baseada no store/contexto
    // Por enquanto, permitimos tudo para não bloquear o desenvolvimento da UI
    const hasPermission = true;

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
