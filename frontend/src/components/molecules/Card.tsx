import { Link } from "react-router-dom";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardLinkProps extends CardProps {
  to: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={['rounded-xl border bg-card text-card-foreground shadow', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export function CardLink({ children, to, className, ...props }: CardLinkProps) {
  return (
    <Link
      to={to}
      {...props}
      className={['block rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background', className]
        .filter(Boolean)
        .join(' ')}
    >
      <Card>{children}</Card>
    </Link>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={['flex flex-col space-y-1.5 p-6', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={['font-semibold leading-none tracking-tight', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardDescription({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={['text-sm text-muted-foreground', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={['p-6 pt-0', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div {...props} className={['flex items-center p-6 pt-0', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}