import { ReactNode } from "react";

interface DashboardPageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: ReactNode; // For tabs or actions
}

const DashboardPageHeader = ({ 
  title, 
  description, 
  icon,
  children 
}: DashboardPageHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default DashboardPageHeader;
