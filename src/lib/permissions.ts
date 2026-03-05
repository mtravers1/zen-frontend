export type AppRole =
  | "client"
  | "executive_assistant"
  | "account_manager"
  | "relationship_manager"
  | "executive_manager"
  | "director"
  | "super_admin";

// Role hierarchy from lowest to highest privilege
const ROLE_HIERARCHY: AppRole[] = [
  "client",
  "executive_assistant",
  "account_manager",
  "relationship_manager",
  "executive_manager",
  "director",
  "super_admin",
];

// Staff roles (everyone except client)
const STAFF_ROLES: AppRole[] = [
  "super_admin",
  "director",
  "executive_manager",
  "relationship_manager",
  "account_manager",
  "executive_assistant",
];

// Manager and above roles
const MANAGER_ROLES: AppRole[] = [
  "super_admin",
  "director",
  "executive_manager",
  "relationship_manager",
  "account_manager",
];

// Director and above roles
const DIRECTOR_ROLES: AppRole[] = ["super_admin", "director"];

/**
 * Map a backend/session role string to AppRole array.
 * The backend returns account_type ?? role ?? "Free".
 */
export function sessionRoleToAppRoles(role: string): AppRole[] {
  const r = role.toLowerCase();
  if (r === "super_admin" || r === "superadmin" || r === "admin") return ["super_admin"];
  if (r === "director") return ["director"];
  if (r === "executive_manager" || r === "manager") return ["executive_manager"];
  if (r === "relationship_manager") return ["relationship_manager"];
  if (r === "account_manager" || r === "staff") return ["account_manager"];
  if (r === "executive_assistant" || r === "assistant") return ["executive_assistant"];
  return ["client"];
}

/**
 * Get the hierarchy level of a role (higher = more privileged)
 */
export function getRoleLevel(role: AppRole): number {
  return ROLE_HIERARCHY.indexOf(role);
}

/**
 * Check if user has at least the required role level
 */
export function hasMinimumRole(userRoles: AppRole[], requiredRole: AppRole): boolean {
  const requiredLevel = getRoleLevel(requiredRole);
  return userRoles.some((role) => getRoleLevel(role) >= requiredLevel);
}

/**
 * Check if user has a specific role
 */
export function hasRole(userRoles: AppRole[], role: AppRole): boolean {
  return userRoles.includes(role);
}

/**
 * Check if user is staff (any non-client role)
 */
export function isStaff(userRoles: AppRole[]): boolean {
  return userRoles.some((role) => STAFF_ROLES.includes(role));
}

/**
 * Check if user is manager or above
 */
export function isManagerOrAbove(userRoles: AppRole[]): boolean {
  return userRoles.some((role) => MANAGER_ROLES.includes(role));
}

/**
 * Check if user is director or above
 */
export function isDirectorOrAbove(userRoles: AppRole[]): boolean {
  return userRoles.some((role) => DIRECTOR_ROLES.includes(role));
}

/**
 * Get the highest role from a list of roles
 */
export function getHighestRole(userRoles: AppRole[]): AppRole | null {
  if (userRoles.length === 0) return null;

  return userRoles.reduce((highest, current) => {
    return getRoleLevel(current) > getRoleLevel(highest) ? current : highest;
  });
}

/**
 * Format role name for display
 */
export function formatRoleName(role: AppRole): string {
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
