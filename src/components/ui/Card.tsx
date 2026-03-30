import type { PropsWithChildren } from 'react';

interface CardProps {
  title?: string;
  className?: string;
}

export function Card({ title, className = '', children }: PropsWithChildren<CardProps>) {
  return (
    <section className={`card ${className}`.trim()}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {children}
    </section>
  );
}
