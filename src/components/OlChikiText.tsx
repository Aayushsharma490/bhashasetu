import React from 'react';

interface OlChikiTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * OlChikiText component
 * Enforces lang="sat" dir="ltr" and Noto Sans Ol Chiki font stack
 * to prevent tofu glyph fallbacks across Android, desktop and web.
 */
export const OlChikiText: React.FC<OlChikiTextProps> = ({
  children,
  className = '',
  as: Component = 'span'
}) => {
  return (
    <Component
      lang="sat"
      dir="ltr"
      className={`font-olchiki tracking-normal ${className}`}
    >
      {children}
    </Component>
  );
};

export default OlChikiText;
