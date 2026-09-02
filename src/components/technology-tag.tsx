type TechnologyTagProps = {
  children: string;
};

export function TechnologyTag({ children }: TechnologyTagProps) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-md border border-border bg-subtle px-2.5 py-1 font-mono text-[0.68rem] font-medium leading-tight text-muted-strong">
      {children}
    </span>
  );
}
