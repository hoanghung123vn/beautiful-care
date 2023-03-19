import classNames from 'classnames';

interface MainNavProps {
  children?: any;
  className?: string;
}

export default function MainNav({ children, className }: MainNavProps) {
  return <div className={classNames(className)}>{children}</div>;
}
