interface HeadingProps {
  title: string;
  description?: string;
  customStyle?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  customStyle,
}) => {
  return (
    <div>
      <h2 className={`text-3xl font-bold tracking-tight ${customStyle}`}>
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
