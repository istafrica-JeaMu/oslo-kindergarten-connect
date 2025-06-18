
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminClasses } from '@/styles/admin-tokens';

interface AdminCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerAction?: React.ReactNode;
}

const AdminCard = ({
  title,
  description,
  children,
  className = '',
  contentClassName = '',
  headerAction
}: AdminCardProps) => {
  return (
    <Card className={`${adminClasses.card} ${className}`}>
      {title && (
        <CardHeader className={adminClasses.cardHeader}>
          <div className={adminClasses.flexBetween}>
            <div>
              <CardTitle className={adminClasses.sectionTitle}>{title}</CardTitle>
              {description && (
                <p className="text-sm text-slate-600 mt-1">{description}</p>
              )}
            </div>
            {headerAction && (
              <div>{headerAction}</div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={`${adminClasses.cardContent} ${contentClassName}`}>
        {children}
      </CardContent>
    </Card>
  );
};

export default AdminCard;
